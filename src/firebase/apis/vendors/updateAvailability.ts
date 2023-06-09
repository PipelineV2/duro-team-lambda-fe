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
import { changeKeyToTrue } from '@/utils';
import { availReturnDataProps } from '@/utils/types';
import { availProps, updateAvailabilityProps } from '@/utils/types';
// Availability Auth
const UpdateAvailabilityApi = async ({
  closingHour,
  operation,
  openingHour,
  workingDays,
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
        availData.closingHour = closingHour;
        availData.openingHour = openingHour;
        changeKeyToTrue(availData.currentOperationStatus, operation);
        availData.workingDays[0] = {
          monday: workingDays.monday,
          tuesday: workingDays.tuesday,
          wednesday: workingDays.wednesday,
          thursday: workingDays.thursday,
          friday: workingDays.friday,
          saturday: workingDays.saturday,
          sunday: workingDays.sunday,
        };
        await setDoc(
          availRef,
          {
            workingDays: availData.workingDays,
            closingHour: availData.closingHour,
            openingHour: availData.openingHour,
            currentOperationStatus: availData.currentOperationStatus,
          },
          { merge: true }
        );

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
