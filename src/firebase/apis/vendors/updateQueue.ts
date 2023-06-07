/* eslint-disable @typescript-eslint/no-explicit-any */

import { doc, setDoc } from '@firebase/firestore';

import { auth, db } from '@/firebase/FirebaseStore';
import { updateQueueProps, updateQueueReturnDataProps } from '@/utils/types';

// Signup Auth
const UpdateQueueApi = async ({
  ticketNo,
  value, // 0 - onQueue; 1 - inProgress; 2 - done
}: updateQueueProps): Promise<updateQueueReturnDataProps | undefined> => {
  let returnData: updateQueueReturnDataProps | undefined;
  try {
    const user: any = auth.currentUser;

    if (user) {
      const updatedQueue = doc(db, `Form-${user.uid}`, ticketNo);
      await setDoc(
        updatedQueue,
        {
          status: value,
        },
        { merge: true }
      ).then(() => {
        returnData = {
          status: 200,
          message: 'Queue updated successfully',
        };
      });
    }
    return returnData;
  } catch (err: any) {
    returnData = {
      status: 400,
      message: err.message,
    };
    return returnData;
  }
};
export default UpdateQueueApi;
