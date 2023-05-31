/* eslint-disable @typescript-eslint/no-explicit-any */
import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '@/firebase/FirebaseStore';

type signinProps = {
  email: string;
  password: string;
};
type returnDataProps = {
  status: number;
  token?: string;
  message: string;
  emailVerified?: boolean;
};

// Signup Auth
const SigninApi = async ({
  email,
  password,
}: signinProps): Promise<returnDataProps | undefined> => {
  let returnData: returnDataProps | undefined;
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);

    const user: any = res.user;

    if (user) {
      returnData = {
        status: 200,
        message: 'Signin successful',
        token: user.accessToken,
        // emailVerified: user.emailVerified,
      };
    }
    return returnData;
  } catch (err: any) {
    switch (err.message) {
      case 'Firebase: Error (auth/user-not-found).':
        returnData = {
          status: 404,
          message: 'Oops! email not found',
        };
        break;
      case 'Firebase: Error (auth/wrong-password).':
        returnData = {
          status: 401,
          message: 'Oops! wrong password',
        };
        break;
      default:
        returnData = {
          status: 400,
          message: err.message,
        };
        break;
    }
    return returnData;
  }
};
export default SigninApi;
