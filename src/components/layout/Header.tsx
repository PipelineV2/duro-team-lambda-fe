import * as React from 'react';

import Button from '@/components/buttons/Button';
import Typography from '@/components/text/Text';

import { useDate } from './useDate';
import { strings } from '../../constant/strings';

import ChatIcon from '~/svg/ChatIcon.svg';
import NotificationIcon from '~/svg/NotificationIcon.svg';
import SearchIcon from '~/svg/SearchIcon.svg';
import Usericon from '~/svg/Usericon.svg';

export default function Header() {
  const { date, time } = useDate();
  const { TRIAL_PERIOD_TEXT } = strings;
  return (
    <>
      <header className='sticky top-0 z-50  w-full '>
        <div className='border-b-grey5 flex h-[96px] items-center justify-between border-b px-6'>
          <Typography variant='secondary' className='text-grey3'>
            {date} | {time}
          </Typography>
          <nav>
            <ul className='flex items-center justify-between space-x-4'>
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
      </header>
      <div className='border-b-grey5 flex items-center  justify-end border-b px-6 py-4'>
        <Typography variant='body2' className='text-grey3 mr-12'>
          {TRIAL_PERIOD_TEXT}
        </Typography>
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
    </>
  );
}
