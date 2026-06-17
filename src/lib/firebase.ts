import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase standard app structure
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore database linking the correct instance
// If you are running locally (e.g. in VSCode/localhost) and have configured your own Firebase project
// in `firebase-applet-config.json`, your free project will only have the "(default)" database.
// This block automatically falls back to "(default)" if we detect a custom projectId to prevent "Database not found" errors!
const isDefaultAppletProject = firebaseConfig.projectId === "flawless-anthem-rzp7b";
const databaseId = isDefaultAppletProject ? firebaseConfig.firestoreDatabaseId : undefined;

export const db = databaseId ? getFirestore(app, databaseId) : getFirestore(app);

// Initialize Firebase Auth
export const auth = getAuth(app);

// Provider definition for Google authentications
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
  };
}

/**
 * Robust error handler mapping to JSON conformant with FirestoreErrorInfo definition
 */
export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
      emailVerified: auth.currentUser?.emailVerified || null,
      isAnonymous: auth.currentUser?.isAnonymous || null,
      tenantId: auth.currentUser?.tenantId || null,
    },
    operationType,
    path,
  };
  console.error('Firestore Security Rule Violation: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

/**
 * Triggers popup authentication with Google account
 */
export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Google Auth Popup Error:', error);
    throw error;
  }
}

/**
 * Logs out the current active session
 */
export async function logoutAccount() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
}
