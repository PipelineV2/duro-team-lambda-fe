import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import FullPageLoader from '@/components/full-page-loader';
import Book from '@/components/mobile-form';

import { VendorFormDetailsApi } from '@/firebase/apis';
import { TVendorDataProps } from '@/utils/types';

type Tstatus = 'LOADING' | 'SUCCESS' | 'ERROR';

const BookingScreen = () => {
  const router = useRouter();
  const [status, setStatus] = useState<Tstatus>('LOADING');
  const [vendor, setVendor] = useState({} as TVendorDataProps);

  const handleError = useCallback(() => {
    toast.error(
      'Application for this booking has either closed, expired or incorrect. please try with a correct link'
    );
    router.push('/error');
  }, [router]);

  useEffect(() => {
    let isMounted = true;
    const getVendor = async () => {
      try {
        const result = await VendorFormDetailsApi(
          router.query.bookingId as string
        );
        if (result === undefined || !result.vendorData) {
          toast.error(
            result?.message ||
              'Application for this booking has either closed, expired or incorrect. please try with a correct link'
          );
          return setTimeout(() => router.push('/error'), 3000);
        } else {
          setVendor(result.vendorData as TVendorDataProps);
          setStatus('SUCCESS');
        }
      } catch (error: any) {
        toast.error(error.message);
        setStatus('ERROR');
      }
    };

    if (isMounted && router.query.bookingId) {
      getVendor();
    }

    return () => {
      isMounted = false;
    };
  }, [handleError, router, router.query.bookingId]);

  return (
    <div>
      {status === 'LOADING' && <FullPageLoader />}
      {status === 'SUCCESS' && <Book vendor={vendor} />}
    </div>
  );
};

export default BookingScreen;
