import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  onAuthStateChanged,
  onIdTokenChanged
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  getDocFromServer,
  setDoc, 
  collection, 
  query, 
  where, 
  getDocs, 
  orderBy, 
  serverTimestamp,
  updateDoc
} from 'firebase/firestore';
import { auth, db, loginWithGoogle, logoutAccount, handleFirestoreError, OperationType } from '../lib/firebase';

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  deliveryAddress: string;
  phone: string;
  city: string;
  state: string;
  pinCode: string;
  role?: 'customer' | 'admin' | string;
  updatedAt?: any;
}

export interface OrderRecord {
  id?: string;
  orderId: string;
  userId: string;
  userEmail: string;
  items: any[];
  total: number;
  paymentMethod: 'cod' | 'razorpay';
  paymentStatus: 'pending' | 'success' | 'failed' | 'Pending Cash' | string;
  paymentId?: string;
  recipientName: string;
  phone: string;
  shippingAddress: string;
  city: string;
  state: string;
  pinCode: string;
  orderStatus: 'processing' | 'shipped' | 'completed' | 'declined' | 'Placed' | string;
  createdAt: any;
  updatedAt?: any;
  courierCollected?: boolean;
  customerAcknowledged?: boolean;
  adminConfirmed?: boolean;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  orders: OrderRecord[];
  isLoading: boolean;
  sessionRole: 'customer' | 'admin';
  setSessionRole: (role: 'customer' | 'admin') => void;
  signIn: (roleSelection?: 'customer' | 'admin', isRegistering?: boolean) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updated: Partial<UserProfile>) => Promise<void>;
  fetchOrders: () => Promise<void>;
  saveOrder: (order: Omit<OrderRecord, 'userId' | 'userEmail' | 'createdAt'>) => Promise<string>;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  const [sessionRole, setSessionRole] = useState<'customer' | 'admin'>(() => {
    try {
      const saved = localStorage.getItem('twirtles_session_role');
      return (saved === 'admin' || saved === 'customer') ? saved : 'customer';
    } catch {
      return 'customer';
    }
  });

  const updateSessionRole = (role: 'customer' | 'admin') => {
    setSessionRole(role);
    try {
      localStorage.setItem('twirtles_session_role', role);
    } catch {}
  };

  // Hardened requirement: Validate FireStore connection upon init
  useEffect(() => {
    async function testConnection() {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error) {
        if (error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Please check your Firebase configuration or network status.");
        }
      }
    }
    testConnection();
  }, []);

  // Sync auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const savedRole = (localStorage.getItem('twirtles_session_role') as 'customer' | 'admin') || 'customer';
        await syncUserProfile(currentUser, savedRole);
      } else {
        setProfile(null);
        setOrders([]);
        setIsLoading(false);
      }
    });
    return unsub;
  }, []);

  const ADMIN_EMAILS = ['priyanshujha1402@gmail.com', 'priyanshujha2610@gmail.com'];

  async function syncUserProfile(firebaseUser: User, selectedRole: 'customer' | 'admin' = 'customer', isRegistering: boolean = false) {
    const path = `users/${firebaseUser.uid}`;
    try {
      const userRef = doc(db, 'users', firebaseUser.uid);
      let userSnap;
      try {
        userSnap = await getDoc(userRef);
      } catch (getErr) {
        handleFirestoreError(getErr, OperationType.GET, path);
      }

      const isSuperAdmin = !!(firebaseUser.email && ADMIN_EMAILS.includes(firebaseUser.email));
      let finalProfile: UserProfile;

      // Safe role resolution to prevent non-admins from self-promoting to admin
      const targetRole = isSuperAdmin ? 'admin' : 'customer';

      if (userSnap.exists()) {
        finalProfile = userSnap.data() as UserProfile;
        
        // Force admin role in DB if the user is a designated superuser and not yet stored as admin
        if (isSuperAdmin && finalProfile.role !== 'admin') {
          finalProfile.role = 'admin';
          await setDoc(userRef, { role: 'admin' }, { merge: true });
        } else if (!isSuperAdmin && finalProfile.role === 'admin') {
          // If they are not super-admins and not in the list, keep their database role if they are promoted by someone else
        } else if (!finalProfile.role) {
          finalProfile.role = targetRole;
          await setDoc(userRef, { role: targetRole }, { merge: true });
        }
      } else {
        // Bootstrap profile on first login
        const newProfile: UserProfile = {
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName || 'Snacker Champion',
          email: firebaseUser.email || '',
          photoURL: firebaseUser.photoURL || '',
          deliveryAddress: '',
          phone: firebaseUser.phoneNumber || '',
          city: '',
          state: '',
          pinCode: '',
          role: targetRole,
        };
        try {
          await setDoc(userRef, newProfile);
        } catch (setErr) {
          handleFirestoreError(setErr, OperationType.WRITE, path);
        }
        finalProfile = newProfile;
      }

      setProfile(finalProfile);

      // Restrict role selection: non-admins cannot switch sessionRole to 'admin'
      const hasAdminPrivilege = isSuperAdmin || finalProfile.role === 'admin';
      if (!hasAdminPrivilege && selectedRole === 'admin') {
        updateSessionRole('customer');
      } else {
        updateSessionRole(selectedRole);
      }
      
      // Auto-fetch orders upon state setup
      await loadOrdersForUser(firebaseUser.uid);
    } catch (err) {
      console.error("Error syncing profile:", err);
      // Re-throw standardized firebase error so platform diagnosis tools can read it
      throw err;
    } finally {
      setIsLoading(false);
    }
  }

  async function loadOrdersForUser(uid: string) {
    const path = 'orders';
    try {
      const ordersRef = collection(db, 'orders');
      const q = query(
        ordersRef, 
        where('userId', '==', uid),
        orderBy('createdAt', 'desc')
      );
      const snap = await getDocs(q);
      const ordersList: OrderRecord[] = [];
      snap.forEach((d) => {
        ordersList.push({ id: d.id, ...d.data() } as OrderRecord);
      });
      setOrders(ordersList);
    } catch (err) {
      handleFirestoreError(err, OperationType.GET, path);
    }
  }

  const fetchOrders = async () => {
    if (!user) return;
    await loadOrdersForUser(user.uid);
  };

  const signIn = async (roleSelection: 'customer' | 'admin' = 'customer', isRegistering: boolean = false) => {
    setIsLoading(true);
    try {
      updateSessionRole(roleSelection);
      const u = await loginWithGoogle();
      if (u) {
        await syncUserProfile(u, roleSelection, isRegistering);
      }
    } catch (err) {
      setIsLoading(false);
      throw err;
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      await logoutAccount();
      setUser(null);
      setProfile(null);
      setOrders([]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (updatedData: Partial<UserProfile>) => {
    if (!user) return;
    const path = `users/${user.uid}`;
    try {
      const userRef = doc(db, 'users', user.uid);
      const dataToSave = {
        ...updatedData,
        uid: user.uid,
        email: user.email || '',
        updatedAt: serverTimestamp()
      };
      await setDoc(userRef, dataToSave, { merge: true });
      setProfile(prev => prev ? { ...prev, ...updatedData } : null);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, path);
    }
  };

  const saveOrder = async (orderData: Omit<OrderRecord, 'userId' | 'userEmail' | 'createdAt'>): Promise<string> => {
    if (!user) throw new Error("Authentication required to place an order.");
    const path = `orders/${orderData.orderId}`;
    try {
      const orderRef = doc(db, 'orders', orderData.orderId);
      const fullOrder: OrderRecord = {
        ...orderData,
        userId: user.uid,
        userEmail: user.email || '',
        createdAt: serverTimestamp(),
      };
      await setDoc(orderRef, fullOrder);
      
      // Refresh local order list
      await loadOrdersForUser(user.uid);
      return orderData.orderId;
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, path);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      orders,
      isLoading,
      sessionRole,
      setSessionRole: updateSessionRole,
      signIn,
      signOut,
      updateProfile,
      fetchOrders,
      saveOrder,
      isAuthModalOpen,
      setIsAuthModalOpen
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
