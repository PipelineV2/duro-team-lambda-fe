/* eslint-disable @typescript-eslint/no-explicit-any */
import { collection, getDocs, query, where } from '@firebase/firestore';

import { db } from '@/firebase/FirebaseStore';
import { getWeekday, isWorkingHours, timeConverter } from '@/utils';
import { vendorReturnDataProps } from '@/utils/types';

// Get user details
const VendorFormDetailsApi = async (
  formLinkID: string
): Promise<vendorReturnDataProps | undefined> => {
  try {
    const vendorDetails = collection(db, 'Vendors');

    const vendorQuery = query(
      vendorDetails,
      where('formLink', '==', formLinkID)
    );
    const querySnapshot = await getDocs(vendorQuery);
    const weekday = getWeekday(new Date());
    if (querySnapshot.docs.length > 0) {
      const vendorData: any = {
        phoneNumber: querySnapshot.docs[0].data().phoneNumber,
        businessName: querySnapshot.docs[0].data().businessName,
        isOperating:
          querySnapshot.docs[0].data().currentOperationStatus['operation'],
        isWorkingDay: querySnapshot.docs[0].data().workingDays[0][weekday],
        isWorkHours: isWorkingHours(
          timeConverter(querySnapshot.docs[0].data().openingHour),
          timeConverter(querySnapshot.docs[0].data().closingHour),
          new Date()
        ),
      };
      return {
        status: 200,
        message: 'vendor data retrieved successful',
        vendorData,
      };
    }
  } catch (err: any) {
    return {
      status: err.status,
      message: err.message,
    };
  }
};
export default VendorFormDetailsApi;
