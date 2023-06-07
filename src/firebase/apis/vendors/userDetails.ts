/* eslint-disable @typescript-eslint/no-explicit-any */
import { collection, getDocs, query, where } from '@firebase/firestore';
import { signOut } from 'firebase/auth';

import { auth, db } from '@/firebase/FirebaseStore';
import { userReturnDataProps } from '@/utils/types';

// Get user details
const UserDetailsApi = async (): Promise<userReturnDataProps | void> => {
  try {
    const user = await auth.currentUser;
    if (user) {
      const userDetails = collection(db, 'Vendors');

      const userQuery = query(userDetails, where('email', '==', user?.email));
      const querySnapshot = await getDocs(userQuery);
      if (querySnapshot.docs.length > 0) {
        const userData: any = {
          uid: user?.uid,
          email: user?.email,
          firstName: querySnapshot.docs[0].data().firstName,
          lastName: querySnapshot.docs[0].data().lastName,
          phoneNumber: querySnapshot.docs[0].data().phoneNumber,
          businessName: querySnapshot.docs[0].data().businessName,
          industry: querySnapshot.docs[0].data().industry,
          employeeSize: querySnapshot.docs[0].data().employeeSize,
          // emailVerified: user.emailVerified,
        };
        return {
          status: 200,
          message: 'user data retrieved successful',
          userData,
        };
      }
    } else {
      // User is signed out
      signOut(auth);
      return {
        status: 401,
        message: 'User is not signed in',
      };
    }
    // });
  } catch (err: any) {
    return {
      status: err.status,
      message: err.message,
    };
  }
};
export default UserDetailsApi;
