import * as React from 'react';

import Button from '@/components/buttons/Button';
import { useDate } from '@/components/layout/useDate';
import Typography from '@/components/text/Text';

import ChatIcon from '~/svg/ChatIcon.svg';
import NotificationIcon from '~/svg/NotificationIcon.svg';
import SearchIcon from '~/svg/SearchIcon.svg';
import Usericon from '~/svg/Usericon.svg';

export default function Header() {
  const { date, time } = useDate();
  return (
    <>
      <header className='sticky top-0 z-50  w-full '>
        <div className='border-b-grey5 flex h-[96px] items-center justify-between border-b px-6'>
          <Typography variant='secondary' className='text-grey3'>
            {date} | {time}
          </Typography>
          <nav>
            <ul className='flex items-center justify-between space-x-4'>
              <SearchIcon width={32} height={32} />
              <NotificationIcon width={32} height={32} />
              <Usericon width={56} height={32} />
            </ul>
          </nav>
        </div>
      </header>
      <div className='border-b-grey5 flex items-center  justify-end border-b px-6 py-4'>
        <Typography variant='body2' className='text-grey3 mr-12'>
          Your trial period ends in 14days on 31st May, 2023
        </Typography>
        <Button variant='primary'>Subscribe now</Button>
        <Button
          variant='secondary'
          rightIcon={ChatIcon}
          rightIconClassName='w-5 h-5 ml-2.5'
          className='text-grey3 border-grey3 ml-2'
        >
          Chat now
        </Button>
      </div>
    </>
  );
}
