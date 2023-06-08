/* eslint-disable @typescript-eslint/no-explicit-any */
import { sendPasswordResetEmail } from 'firebase/auth';

import { auth } from '@/firebase/FirebaseStore';

const ResetPasswordApi = async (email: string) => {
  try {
    const res: any = await sendPasswordResetEmail(auth, email);
    if (typeof res === 'undefined') {
      return {
        status: 200,
        message: `Password reset details sent to ${email}.`,
      };
    }
  } catch (err: any) {
    return {
      status: err.code,
      message: err.message,
    };
  }
};
export default ResetPasswordApi;
