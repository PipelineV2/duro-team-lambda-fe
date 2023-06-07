/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from '@firebase/firestore';
import { signOut } from 'firebase/auth';

import { auth, db } from '@/firebase/FirebaseStore';
import { changeKeyToInverseBoolean, changeKeyToTrue } from '@/utils';
import { availReturnDataProps } from '@/utils/types';
import { availProps, updateAvailabilityProps } from '@/utils/types';
// Availability Auth
const UpdateAvailabilityApi = async ({
  type, // "openingHour" | "operation" | "closingHour" | "workingDays"
  value,
}: updateAvailabilityProps): Promise<availReturnDataProps | void> => {
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
        const availRef = doc(db, 'Vendors', user.uid);

        switch (type) {
          case 'workingDays':
            // value can be "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday"
            changeKeyToInverseBoolean(availData.workingDays[0], value);

            await setDoc(
              availRef,
              {
                workingDays: availData.workingDays,
              },
              { merge: true }
            );

            break;

          case 'closingHour':
            availData.closingHour = value;
            await setDoc(
              availRef,
              {
                openingHour: availData.closingHour,
              },
              { merge: true }
            );

            break;

          case 'openingHour':
            availData.openingHour = value;
            await setDoc(
              availRef,
              {
                openingHour: availData.openingHour,
              },
              { merge: true }
            );

            break;

          case 'operation':
            // value can be "operation" | "break" | "closed"
            changeKeyToTrue(availData.currentOperationStatus[0], value);

            await setDoc(
              availRef,
              {
                currentOperationStatus: availData.currentOperationStatus,
              },
              { merge: true }
            );

            break;

          default:
            break;
        }

        return {
          status: 200,
          message: 'available screen data updated successful',
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
export default UpdateAvailabilityApi;
