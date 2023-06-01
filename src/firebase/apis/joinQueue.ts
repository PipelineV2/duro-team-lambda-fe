/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from '@firebase/firestore';

import { db } from '@/firebase/FirebaseStore';
import { generateRandomCharacters } from '@/utils';
import { joinQueueProps, queueReturnDataProps } from '@/utils/types';
// Create/Join Queue
const JoinQueueApi = async ({
  name,
  purpose,
  phoneNumber,
  formLink,
}: joinQueueProps): Promise<queueReturnDataProps | string | undefined> => {
  try {
    let returnData;
    const vendorDB = collection(db, 'Vendors');
    const vendorQuery = query(vendorDB, where('formLink', '==', formLink));

    const vendorSnapshot = await getDocs(vendorQuery);
    if (vendorSnapshot.docs.length > 0) {
      const uid = vendorSnapshot.docs[0].id;
      const queueDB = collection(db, `Form-${uid}`);

      const queueQuery = query(
        queueDB,
        where('phoneNumber', '==', phoneNumber)
      );

      const queueSnapshot = await getDocs(queueQuery);
      if (
        queueSnapshot.docs.length > 0 &&
        new Date(queueSnapshot.docs[0].data().date).getDate() ===
          new Date().getDate() &&
        queueSnapshot.docs[0].data().status !== 2
      ) {
        returnData = {
          status: 409,
          message: 'Oops! User already on queue',
        };
      } else {
        // const num: string = Math.floor(Math.random() * 99999).toString();
        const id = generateRandomCharacters(5);

        const queueListDB = collection(db, `Form-${uid}`);
        const queueNumberQuery = query(queueListDB, where('status', '==', 0));
        const queueNumberSnapshot = await getDocs(queueNumberQuery);
        const newFormDB = doc(db, `Form-${uid}`, id);
        await setDoc(
          newFormDB,
          {
            vendor: vendorSnapshot.docs[0].data().businessName,
            vendorId: uid,
            date: Date(),
            ticketNo: id,
            name,
            purpose,
            phoneNumber,
            status: 0, // on queue
          },
          { merge: true }
        ).then(() => {
          returnData = {
            status: 201,
            queueNumber: queueNumberSnapshot.docs.length + 1,
            message: 'New User added to Queue',
          };
        });
      }
    } else {
      returnData = {
        status: 404,
        message: 'Oops! Vendor does not exist in our database',
      };
    }
    return returnData;
  } catch (err) {
    const returnData = {
      status: 400,
      message: 'Oops! an error occured',
    };
    return returnData;
  }
};
export default JoinQueueApi;
