import Link from 'next/link';
import React from 'react';

import { useDate } from '@/components/layout/useDate';
import Seo from '@/components/Seo';
import Table from '@/components/Table';
import Typography from '@/components/text/Text';

import data from '../utils/data.json';

import DuroLogo from '~/svg/Duro.svg';

const Live = () => {
  const { date, time } = useDate();
  return (
    <main className='h-screen w-screen p-3 '>
      <Seo templateTitle='Dashboard' description='Dashboard Statistics' />
      <section className='mx-auto  w-full max-w-screen-lg pt-5   md:pt-[60px]'>
        <Link href='/'>
          <DuroLogo className='text-green m-auto mb-4  h-[40px] w-[120px] md:mb-8 lg:mb-16 lg:h-[55px] lg:w-[142px] ' />
        </Link>
        <Table type='EXTERNAL_QUEUE' data={data} title='Current queue' />
        <Typography variant='secondary' className='text-grey3 mt-8'>
          {date} | {time}
        </Typography>
      </section>
    </main>
  );
};

export default Live;
