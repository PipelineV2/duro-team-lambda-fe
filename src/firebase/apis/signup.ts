import { doc, setDoc } from '@firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { auth, db } from '@/firebase/FirebaseStore';

type signupProps = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  businessName: string;
  industry: string;
  employeeSize: string;
  phoneNumber: string;
};
type returnDataProps = {
  status: number;
  token?: string;
  message: string;
  userData?: {
    email: string;
    businessName: string;
  };
};

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
}: signupProps): Promise<returnDataProps | string | undefined> => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
          employeeSize: employeeSize,
        },
        { merge: true }
      ).then(() => {
        returnData = {
          status: 201,
          message: 'signup successful',
          token: user.accessToken,
          userData: {
            email: email,
            businessName: businessName,
          },
        };
        // return returnData;
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
