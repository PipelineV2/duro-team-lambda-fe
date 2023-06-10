/* eslint-disable @typescript-eslint/no-explicit-any */
import { collection, getDocs, query, where } from '@firebase/firestore';
import { signOut } from 'firebase/auth';

import { auth, db } from '@/firebase/FirebaseStore';
import { availProps, availReturnDataProps } from '@/utils/types';

// Availability Auth
const AvailabilityApi = async (): Promise<availReturnDataProps | undefined> => {
  try {
    const user = await auth.currentUser;
    if (user) {
      const availDetails = collection(db, 'Vendors');
      const availQuery = query(availDetails, where('email', '==', user.email));
      const querySnapshot = await getDocs(availQuery);
      if (querySnapshot.docs.length > 0) {
        const availData: availProps = {
          subscribed: querySnapshot.docs[0].data().subscribed,
          openingHour: querySnapshot.docs[0].data().openingHour,
          closingHour: querySnapshot.docs[0].data().closingHour,
          currentOperationStatus:
            querySnapshot.docs[0].data().currentOperationStatus,
          workingDays: querySnapshot.docs[0].data().workingDays,
        };
        return {
          status: 200,
          message: 'available screen data retrieved successful',
          data: availData,
        };
      }
    } else {
      // User is signed out
      signOut(auth);
      return {
        status: 401,
        message: 'User is not authorized to access this resource',
      };
    }
  } catch (err: any) {
    return {
      status: err.status,
      message: err.message,
    };
  }
};
export default AvailabilityApi;
