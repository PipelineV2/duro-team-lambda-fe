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
import {
  dateFormaterString,
  getWeekday,
  isWorkingHours,
  timeConverter,
} from '@/utils';
import { joinQueueProps, queueReturnDataProps } from '@/utils/types';
// Create/Join Queue
const JoinQueueApi = async ({
  name,
  purpose,
  phoneNumber,
  formLink,
}: joinQueueProps): Promise<queueReturnDataProps | undefined> => {
  try {
    let returnData;
    const vendorDB = collection(db, 'Vendors');
    const vendorQuery = query(vendorDB, where('formLink', '==', formLink));
    const weekday = getWeekday(new Date());
    const vendorSnapshot = await getDocs(vendorQuery);
    const isOperating: boolean =
      vendorSnapshot.docs[0].data().currentOperationStatus[0]['operation'];
    const isWorkingDay: boolean =
      vendorSnapshot.docs[0].data().workingDays[0][weekday];
    const isWorkHours: boolean = isWorkingHours(
      timeConverter(vendorSnapshot.docs[0].data().openingHour),
      timeConverter(vendorSnapshot.docs[0].data().closingHour),
      new Date()
    );

    if (
      vendorSnapshot.docs.length > 0 &&
      // Todo: uncomment the below for production. These conditions will affect continus development hence why they are commented
      isOperating &&
      isWorkingDay &&
      isWorkHours
    ) {
      const uid = vendorSnapshot.docs[0].id;
      const queueDB = collection(db, `Form-${uid}`);

      const queueQuery = query(
        queueDB,
        where('phoneNumber', '==', phoneNumber) // Todo: geocode enabled conditions and subscription
      );

      const queueSnapshot = await getDocs(queueQuery);

      if (
        queueSnapshot.docs.length > 0 &&
        queueSnapshot.docs[0].data().date ===
          dateFormaterString(new Date().toString()) &&
        queueSnapshot.docs[0].data().status !== 2
      ) {
        returnData = {
          status: 409,
          message: 'Oops! User already on queue',
        };
      } else {
        const num: string = Math.floor(Math.random() * 99999).toString();
        let queueNumber = 1;
        const queueListDB = collection(db, `Form-${uid}`);
        const queueNumberQuery = query(queueListDB, where('status', '<=', 0)); // date factor
        const queueNumberSnapshot = await getDocs(queueNumberQuery);
        if (queueNumberSnapshot.docs.length > 0) {
          queueNumber =
            queueNumberSnapshot.docs.filter(
              (doc) =>
                doc?.data().date === dateFormaterString(new Date().toString())
            ).length + 1;
        }
        const newFormDB = doc(db, `Form-${uid}`, num);
        const today = new Date();
        await setDoc(
          newFormDB,
          {
            vendor: vendorSnapshot.docs[0].data().businessName,
            vendorId: uid,
            date: dateFormaterString(today.toString()),
            ticketNo: num,
            name,
            purpose,
            phoneNumber,
            queueNumber,
            status: 0, // on queue
          },
          { merge: true }
        ).then(() => {
          returnData = {
            status: 201,
            queueNumber,
            message: 'New User added to Queue',
          };
        });
      }
    } else {
      returnData = {
        status: 404,
        message: `Oops! This Form is Expired. Kindly Contact reach out to ${
          vendorSnapshot.docs[0].data().businessName
        } for further directives`,
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
