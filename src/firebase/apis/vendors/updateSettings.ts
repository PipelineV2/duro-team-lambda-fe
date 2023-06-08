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
import { createFormLink, replaceKeyValues } from '@/utils';
import { settReturnDataProps } from '@/utils/types';
import { updateSettingsProps } from '@/utils/types';

// Availability Auth
const UpdateSettingsApi = async ({
  type, // "geofenceData" | "link"
  value = null,
}: updateSettingsProps): Promise<settReturnDataProps | void> => {
  try {
    const user = await auth.currentUser;
    if (user) {
      const settingDetails = collection(db, 'Vendors');
      const settingQuery = query(
        settingDetails,
        where('email', '==', user.email)
      );
      const querySnapshot = await getDocs(settingQuery);
      if (querySnapshot.docs.length > 0) {
        const settingsData: any = {
          phoneNumber: querySnapshot.docs[0].data().phoneNumber,
          geofenceData: querySnapshot.docs[0].data().geofenceData,
          link: querySnapshot.docs[0].data().formLink,
        };
        const settingRef = doc(db, 'Vendors', user.uid);

        switch (type) {
          case 'link':
            (settingsData.link = createFormLink(
              querySnapshot.docs[0].data().businessName
            )),
              await setDoc(
                settingRef,
                {
                  formLink: settingsData.link,
                },
                { merge: true }
              );

            break;

          case 'geofenceData':
            // value is an object of (lat, long and workingRadius)
            replaceKeyValues(settingsData.geofenceData, value);

            await setDoc(
              settingRef,
              {
                geofenceData: settingsData.geofenceData,
              },
              { merge: true }
            );

            break;

          default:
            break;
        }

        return {
          status: 200,
          message: 'settings screen data updated successful',
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
export default UpdateSettingsApi;
