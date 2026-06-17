# Firebase Security Specification (TDD)

## 1. Data Invariants
1. **User Ownership**: A user document at `/users/{userId}` can only be read or written by the authenticated user with specific ID matching `{userId}`. Users can never edit RBAC fields or spoof others.
2. **Order Separation**: An order at `/orders/{orderId}` can only be read or listed by the authenticated creator (`userId` inside the order must match `request.auth.uid`). No generic list access is allowed.
3. **Immutability of Key Data**: Once an order is created, fundamental fields like `orderId`, `userId`, `userEmail`, `total`, `items`, and `createdAt` are locked to prevent fraud or post-transaction tampering.
4. **Time Fidelity**: `createdAt` on orders and `updatedAt` on user profiles must strictly equal the database server timestamp `request.time`.

## 2. The "Dirty Dozen" Malicious Payloads (Blocked)
1. **The Ghost User Profile Hack**: Creating a `/users/attackerId` document where standard `email` is set to admin's email, trying to claim spoofed identity. (Blocked by `request.auth.uid == userId` and `email` matching authentication token).
2. **The Anonymous Privilege Escalation**: Submitting a user write without verification. (Blocked by `request.auth.token.email_verified == true`).
3. **The User Profile Overwrite**: An authenticated user attempting to overwrite another user's profile at `/users/victimUserId`. (Blocked by matching `request.auth.uid` validation).
4. **The Unbounded Address Payload**: Injecting a 2MB junk string inside the user's `deliveryAddress` to crash lists or trigger billing storage exploits. (Blocked by length guards: `data.deliveryAddress.size() <= 300`).
5. **The Spoofed Order Owner Escape**: Submitting an order with `userId` as `victimUserId` hoping to charge their profile. (Blocked by `incoming().userId == request.auth.uid`).
6. **The Price Markdown Exploitation**: Creating an order with a total price of `-₹100` or `₹0.01` for premium snacks. (Blocked by `incoming().total >= 1`).
7. **The Retroactive Order Date-Stamp Shift**: Creating an order with `createdAt` backdated to 5 years ago. (Blocked by `incoming().createdAt == request.time`).
8. **The System-Only Field Infestation**: Attempting to alter `orderStatus` to completed directly from the client. (Blocked by ensuring `incoming().orderStatus == 'processing'` upon creation, and restricting transitions).
9. **The Order Item Shape Injection**: Appending a massive unvalidated object without product name inside the `items` array. (Blocked by `items` schema size restrictions and key validation).
10. **The Direct Order Status Hijack**: Client-triggered updating of `orderStatus` to 'shipped' on an existing order. (Blocked by action-based updates preventing client-side status mutation).
11. **The Order Hijack Read Probe**: Attempting a list or get query on `/orders` without filters to scrape other user orders. (Blocked by secure list constraint `resource.data.userId == request.auth.uid`).
12. **The Terminal State Unlock**: Trying to modify the address of an order once it is set or paid. (Blocked by terminal validation).

## 3. Test Invariant Reference
Our security rules are structured to return `PERMISSION_DENIED` on all these payloads. Let's document our robust `firestore.rules` containing global validation guards.
