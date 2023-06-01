/* eslint-disable @typescript-eslint/no-explicit-any */
import { collection, getDocs, query, where } from '@firebase/firestore';
import { signOut } from 'firebase/auth';

import { auth, db } from '@/firebase/FirebaseStore';
import { settingsReturnDataProps } from '@/utils/types';

// Availability Auth
const SettingsApi = async (): Promise<settingsReturnDataProps | void> => {
  try {
    const user = await auth.currentUser;
    if (user) {
      const settingsDetails = collection(db, 'Vendors');
      const settingsQuery = query(
        settingsDetails,
        where('email', '==', user.email)
      );
      const querySnapshot = await getDocs(settingsQuery);
      if (querySnapshot.docs.length > 0) {
        const settingsData: any = {
          phoneNumber: querySnapshot.docs[0].data().phoneNumber,
          geofenceData: querySnapshot.docs[0].data().geofenceData,
          link: querySnapshot.docs[0].data().formLink,
        };
        return {
          status: 200,
          message: 'settings screen data retrieved successful',
          data: settingsData,
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
export default SettingsApi;
