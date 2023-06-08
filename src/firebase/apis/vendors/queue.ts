/* eslint-disable @typescript-eslint/no-explicit-any */
import { collection, getDocs, query, where } from '@firebase/firestore';
import { signOut } from 'firebase/auth';

import { auth, db } from '@/firebase/FirebaseStore';
import { dateFormaterString } from '@/utils';
import { queueProps } from '@/utils/types';

// Get user details

const QueueApi = async (date: string) => {
  const queueArray: queueProps[] = [];
  let data: queueProps[] = [];
  let sortedArray: queueProps[] = [];
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
              date: dateFormaterString(doc?.data().date),
              ticketNo: doc?.data().ticketNo,
              name: doc?.data().name,
              purpose: doc?.data().purpose,
              phoneNumber: doc?.data().phoneNumber,
              status: doc?.data().status,
              queueNumber: doc?.data().queueNumber,
            });
          });
          sortedArray = queueArray.sort(
            (a, b) => a.queueNumber - b.queueNumber
          );
          if (date !== '') {
            sortedArray
              .filter((doc) => doc.date === date)
              .map((d) => {
                data.push(d);
              });
          } else {
            data = sortedArray;
          }
        }

        return {
          status: 200,
          message: '(vendor) queue screen data retrieved successful',
          queueArray: data,
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
