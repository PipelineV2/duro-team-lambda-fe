import * as React from 'react';

import Button from '@/components/buttons/Button';
import Typography from '@/components/text/Text';

import { useDate } from './useDate';
import { strings } from '../../constant/strings';

import ChatIcon from '~/svg/ChatIcon.svg';
import NotificationIcon from '~/svg/NotificationIcon.svg';
import SearchIcon from '~/svg/SearchIcon.svg';
import Usericon from '~/svg/UserIcon.svg';

export default function Header() {
  const { date, time } = useDate();
  const { TRIAL_PERIOD_TEXT } = strings;
  return (
    <header className='fixed top-0 z-10  w-full  bg-[#FBFBFB] md:pl-72'>
      <div className='border-b-grey5 h-[96px] items-center justify-between border-b px-6 pt-3 md:flex'>
        <Typography variant='secondary' className='text-grey3'>
          {date} | {time}
        </Typography>
        <nav className='flex justify-end'>
          <ul className='flex max-w-[150px] items-center justify-between space-x-4'>
            <li>
              <button type='button' role='button' title='Search Icon'>
                <SearchIcon className='text-[32px]' />
              </button>
            </li>
            <li>
              <button type='button' role='button' title='Notification Icon'>
                <NotificationIcon className='text-[32px]' />
              </button>
            </li>
            <li>
              <button type='button' role='button' title='User icon'>
                <Usericon className='text-[56px]' />
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div className='border-b-grey5 flex-wrap items-center  justify-end gap-4  border-b px-6 py-4 md:flex'>
        <Typography variant='body2' className='text-grey3 pb-3 md:pb-0'>
          {TRIAL_PERIOD_TEXT}
        </Typography>
        <div className='flex'>
          <Button
            variant='primary'
            onClick={() => undefined}
            text='Subscribe now'
          />
          <Button
            variant='secondary'
            rightIcon={ChatIcon}
            onClick={() => undefined}
            rightIconClassName='w-5 h-5 ml-2.5'
            className='text-grey3 border-grey3 ml-2'
            text='Chat now'
          />
        </div>
      </div>
    </header>
  );
}
