/* eslint-disable @typescript-eslint/no-explicit-any */
import { collection, getDocs, query, where } from '@firebase/firestore';
import { signOut } from 'firebase/auth';

import { auth, db } from '@/firebase/FirebaseStore';
import { createQueueReturnDataProps, queueProps } from '@/utils/types';

// Get user details
const QueueApi = async (): Promise<createQueueReturnDataProps | void> => {
  const queueArray: queueProps[] = [];
  try {
    const user = await auth.currentUser;
    if (user) {
      const userDetails = collection(db, 'Vendors');

      const userQuery = query(userDetails, where('email', '==', user?.email));
      const querySnapshot = await getDocs(userQuery);
      if (querySnapshot.docs.length > 0) {
        const uid = querySnapshot.docs[0].id;
        const queueDB = collection(db, `Form-${uid}`);

        const queueQuery = query(queueDB);
        const queueSnapshot = await getDocs(queueQuery);

        if (queueSnapshot.docs.length > 0) {
          queueSnapshot.docs.map((doc) => {
            queueArray.push({
              date: doc?.data().date,
              ticketNo: doc?.data().ticketNo,
              name: doc?.data().name,
              purpose: doc?.data().purpose,
              phoneNumber: doc?.data().phoneNumber,
              status: doc?.data().status,
            });
          });
        }

        return {
          status: 200,
          message: 'queue screen data retrieved successful',
          queueArray,
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
export default QueueApi;
