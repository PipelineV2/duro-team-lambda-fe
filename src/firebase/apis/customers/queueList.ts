/* eslint-disable @typescript-eslint/no-explicit-any */
import { collection, getDocs, query, where } from '@firebase/firestore';

import { db } from '@/firebase/FirebaseStore';
import { dateFormaterString } from '@/utils';
import { queueListDataProps } from '@/utils/types';
// Get user details

const QueueListApi = async (formLinkID: string) => {
  const queueArray: queueListDataProps[] = [];
  const data: queueListDataProps[] = [];
  let sortedArray: queueListDataProps[] = [];

  const today = dateFormaterString(new Date().toString());
  try {
    const vendorDetails = collection(db, 'Vendors');

    const vendorQuery = query(
      vendorDetails,
      where('formLink', '==', formLinkID)
    );
    const querySnapshot = await getDocs(vendorQuery);
    if (querySnapshot.docs.length > 0) {
      const uid = querySnapshot.docs[0].id;
      const queueDB = collection(db, `Form-${uid}`);

      const queueQuery = query(queueDB, where('status', '<=', 1));
      const queueSnapshot = await getDocs(queueQuery);

      if (queueSnapshot.docs.length > 0) {
        queueSnapshot.docs.map((doc) => {
          queueArray.push({
            date: dateFormaterString(doc?.data().date),
            ticketNo: doc?.data().ticketNo,
            name: doc?.data().name,
            queueNumber: doc?.data().queueNumber,
          });
        });
        sortedArray = queueArray.sort((a, b) => a.queueNumber - b.queueNumber);

        sortedArray
          .filter((doc) => doc.date === today)
          .map((d) => {
            data.push(d);
          });
      }

      return {
        status: 200,
        message: 'queue List data retrieved successful',
        queueArray: data,
        totalQueue: data.length,
      };
    }
  } catch (err: any) {
    return {
      status: err.status,
      message: err.message,
    };
  }
};
export default QueueListApi;
