import { signOut } from 'firebase/auth';

import { auth } from '@/firebase/FirebaseStore';

// Signup Auth
const SignoutApi = async (): Promise<void> => {
  try {
    // User is signed out
    signOut(auth)
      .then(() => {
        return;
        // Sign-out successful.
      })
      .catch((err) => {
        return err;
      });
  } catch (err) {
    // for debugging, console.log(err)
  }
};
export default SignoutApi;
