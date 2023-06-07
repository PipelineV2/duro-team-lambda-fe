/* eslint-disable @typescript-eslint/no-explicit-any */
import { doc, setDoc } from '@firebase/firestore';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';

import { auth, db } from '@/firebase/FirebaseStore';
import { createFormLink } from '@/utils';
import { signupProps } from '@/utils/types';

// Signup Auth
const SignupApi = async ({
  email,
  password,
  firstName,
  lastName,
  businessName,
  industry,
  employeeSize,
  phoneNumber,
}: signupProps) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user: any = res.user;
    let returnData;
    if (user) {
      const uid = res.user.uid;
      const newVendor = doc(db, 'Vendors', uid);
      await setDoc(
        newVendor,
        {
          email: email,
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          businessName: businessName,
          industry: industry,
          formLink: createFormLink(businessName),
          employeeSize: employeeSize,
          subscribed: false,
          openingHour: '8:00 am',
          closingHour: '6:00 pm',
          currentOperationStatus: [
            {
              operation: true,
              break: false,
              closed: false,
            },
          ],
          workingDays: [
            {
              monday: true,
              tuesday: true,
              wednesday: true,
              thursday: true,
              friday: true,
              saturday: false,
              sunday: false,
            },
          ],
          geofenceData: [
            {
              lat: 6.5243793,
              long: 3.3792057,
              workingRadius: 2,
              radiusUnit: 'km',
            },
          ],
        },
        { merge: true }
      ).then(async () => {
        const currentUser: any = auth.currentUser;
        sendEmailVerification(currentUser).then(() => {
          // Email verification sent!
          // ...
        });

        returnData = {
          status: 201,
          message: 'signup successful',
          token: user.accessToken,
          userData: {
            email,
            businessName,
            // emailVerified: user.emailVerified,
          },
        };
      });
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
export default SignupApi;
