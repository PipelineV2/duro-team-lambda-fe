/* eslint-disable @typescript-eslint/no-explicit-any */
import { signOut, updatePassword } from 'firebase/auth';

import { auth } from '@/firebase/FirebaseStore';
import { changeReturnDataProps } from '@/utils/types';

const ChangePasswordApi = async (
  newPassword: string
): Promise<changeReturnDataProps | string | undefined> => {
  try {
    const currentUser: any = auth.currentUser;
    if (currentUser) {
      const res: any = await updatePassword(currentUser, newPassword);
      if (typeof res === 'undefined') {
        return {
          status: 200,
          message: `Password changed successfully`,
        };
      }
    }
  } catch (err: any) {
    signOut(auth);
    return {
      status: err.code,
      message: err.message,
    };
  }
};
export default ChangePasswordApi;
