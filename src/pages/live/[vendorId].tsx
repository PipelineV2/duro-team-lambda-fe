import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import FullPageLoader from '@/components/full-page-loader';
import { useDate } from '@/components/layout/useDate';
import Seo from '@/components/Seo';
import Table from '@/components/Table';
import Typography from '@/components/text/Text';

import { QueueListApi } from '@/firebase/apis';
import { Tstatus } from '@/pages/booking/[bookingId]';
import { queueListDataProps } from '@/utils/types';

import DuroLogo from '~/svg/Duro.svg';

const Live = () => {
  const router = useRouter();
  const [status, setStatus] = useState<Tstatus>('LOADING');
  const [queue, setQueue] = useState([] as queueListDataProps[]);
  const { date, time } = useDate();

  useEffect(() => {
    let isMounted = true;
    const getVendor = async () => {
      try {
        const result = await QueueListApi(router.query.vendorId as string);
        if (result === undefined || !result.queueArray) {
          toast.error(result?.message || 'Invalid Vendor');
          return setTimeout(() => router.push('/error'), 3000);
        } else {
          setQueue(result.queueArray);
          setStatus('SUCCESS');
        }
      } catch (error: any) {
        toast.error(error.message);
        setStatus('ERROR');
      }
    };

    if (isMounted && router.query.vendorId) {
      getVendor();
    }

    return () => {
      isMounted = false;
    };
  }, [router, router.query.bookingId]);

  return (
    <main className='h-screen w-screen p-3 '>
      <Seo templateTitle='Dashboard' description='Dashboard Statistics' />
      <section className='mx-auto  w-full max-w-screen-lg pt-5   md:pt-[60px]'>
        <Link href='/'>
          <DuroLogo className='text-green m-auto mb-4  h-[40px] w-[120px] md:mb-8 lg:mb-16 lg:h-[55px] lg:w-[142px] ' />
        </Link>
        {status === 'LOADING' && <FullPageLoader />}
        {status === 'SUCCESS' && (
          <Table type='EXTERNAL_QUEUE' data={queue} title='Current queue' />
        )}
        <Typography variant='secondary' className='text-grey3 mt-8'>
          {date} | {time}
        </Typography>
      </section>
    </main>
  );
};

export default Live;
