/* eslint-disable @typescript-eslint/no-explicit-any */
import { collection, getDocs, query, where } from '@firebase/firestore';
import { signOut } from 'firebase/auth';

import { auth, db } from '@/firebase/FirebaseStore';
import { dashboardReturnDataProps } from '@/utils/types';

// Availability Auth
const DashboardApi = async (): Promise<dashboardReturnDataProps | void> => {
  try {
    const user = await auth.currentUser;
    if (user) {
      const dashboard = collection(db, `Form-${user.uid}`);

      const dashboardQuery = query(dashboard);
      const dashboardSnapshot = await getDocs(dashboardQuery);

      // attendedto
      const attendedQuery = query(dashboard, where('status', '==', 2));
      const attendedSnapshot = await getDocs(attendedQuery);

      // unattendedto
      const unattendedQuery = query(dashboard, where('status', '==', 0));
      const unattendedSnapshot = await getDocs(unattendedQuery);
      // inprogress
      const inprogressQuery = query(dashboard, where('status', '==', 1));
      const inprogressSnapshot = await getDocs(inprogressQuery);

      if (dashboardSnapshot.docs.length > 0) {
        const dashboardData: any = {
          queueLength: dashboardSnapshot.docs.length,
          attendedTo: attendedSnapshot.docs.length,
          leftQueue:
            unattendedSnapshot.docs.length + inprogressSnapshot.docs.length,
          queueProgress:
            (attendedSnapshot.docs.length / dashboardSnapshot.docs.length) *
            100,
          totalVisits: [],
        };
        return {
          status: 200,
          message: 'dashboard screen data retrieved successful',
          data: dashboardData,
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
export default DashboardApi;
