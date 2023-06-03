import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';

import Button from '@/components/buttons';
import Typography from '@/components/text';

function MenuBar() {
  const navigation = [
    { name: 'Features', href: '/landingpage' },
    { name: 'Pricing', href: '/landingpage' },
    { name: 'Industries', href: '/landingpage' },
    { name: 'Resources', href: '/landingpage' },
  ];

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  const startFreeTrial = (): string => {
    setIsLoggedIn(false); //remove later
    return 'clicked';
  };
  return (
    <header className='top-0 h-12'>
      <nav
        /* className="flex items-center justify-between p-6 lg:px-8 fixed top-0 w-full z-50 bg-inherit shadow" */

        className={`shadow" } top-0 z-50  flex w-full cursor-pointer items-center justify-between bg-inherit p-6 text-sm font-semibold leading-6
     
        lg:px-8`}
        aria-label='Global'
      >
        <div className='flex lg:flex-1'>
          <Link href='/' className='-m-1.5 cursor-pointer p-1.5'>
            <span className='sr-only'>Your Company</span>
            <Image
              className='h-8 w-auto'
              src='/svg/Duro.svg'
              alt=''
              width={40}
              height={40}
            />
          </Link>
        </div>
        <div className='flex lg:hidden'>
          <button
            type='button'
            className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className='sr-only'>Open main menu</span>
            <Bars3Icon className='h-6 w-6' aria-hidden='true' />
          </button>
        </div>
        <div
          className='hidden lg:flex lg:gap-x-12'
          onClick={() => setMobileMenuOpen(false)}
        >
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`cursor-pointer text-sm font-semibold leading-6 
                
              `}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className='hidden lg:flex lg:flex-1 lg:justify-end'>
          {!isLoggedIn && (
            <Link
              href='/landingpage'
              className={`bg-primary mr-5 cursor-pointer rounded  px-1 py-2 text-sm font-semibold leading-6 
              `}
            >
              Log in
            </Link>
          )}
          {isLoggedIn && (
            <button className=' bg-secondary rounded p-2 text-white'>
              Logout
            </button>
          )}
          <Button
            variant='primary'
            text='Start Free Trial'
            onClick={() => {
              startFreeTrial;
            }}
          ></Button>
        </div>
      </nav>
      <Dialog
        as='div'
        className='lg:hidden'
        open={mobileMenuOpen}
        onClose={closeMobileMenu}
      >
        <div className=' inset-0 z-50' />
        <div
          className={`${
            mobileMenuOpen ? 'absolute top-1' : ''
          } bg-light-green sm:ring-gray-900/10" inset-y-0  right-0 z-50 w-full overflow-y-auto px-6 py-6 sm:max-w-sm sm:ring-1`}
        >
          <div className='flex items-center justify-between'>
            <Link href='/' className='-m-1.5 p-1.5'>
              <span className='sr-only'>Your Company</span>
              <Image
                className='h-8 w-auto cursor-pointer'
                src='/svg/Duro.svg'
                alt=''
                width={20}
                height={20}
              />
            </Link>
            <button
              type='button'
              className='-m-2.5 rounded-md p-2.5 text-gray-700'
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className='sr-only'>Close menu</span>
              <XMarkIcon className='h-6 w-6' aria-hidden='true' />
            </button>
          </div>
          <div className='mt-6 flow-root'>
            <div className='-my-6 divide-y divide-gray-500/10'>
              <div className='space-y-2 py-6'>
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => closeMobileMenu()}
                    className={`-mx-3 block cursor-pointer rounded-lg px-3 py-2 text-base font-bold leading-7 
                 `}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className='py-6'>
                {!isLoggedIn && (
                  <Link
                    href='/login'
                    className='bg-primary mr-5 cursor-pointer rounded px-1 py-1 text-sm font-semibold leading-6'
                  >
                    Log in
                  </Link>
                )}
                {isLoggedIn && (
                  <button className=' bg-secondary rounded p-2 text-white'>
                    Logout
                  </button>
                )}
                <Button
                  variant='primary'
                  text='Start Free Trial'
                  onClick={() => {
                    startFreeTrial;
                  }}
                ></Button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </header>
  );
}

const LandingPage = () => {
  const freeTrialRef = useRef(null);
  const startFreeTrial = (): string => {
    return 'clicked';
  };
  return (
    <div className='bg-light-green min-h-fit w-full'>
      <MenuBar />
      <div className=' mt-10 p-5 sm:flex sm:justify-between'>
        {' '}
        <div className='items-center  sm:w-1/2 sm:pt-32'>
          <Typography variant='h1' color='#231F20'>
            Boost Customer Happiness, Improve Service Operations
          </Typography>
          <Typography variant='body3' className='font-primary w-3/5'>
            Transform your queue experience for customers with a system that
            provides virtual queues and analytics for effective queue
            management.
          </Typography>
          <div className='mt-4 flex p-2'>
            <Button
              variant='primary'
              ref={freeTrialRef}
              onClick={() => {
                startFreeTrial;
              }}
              text='Start Free Trial'
              size='large'
              className=' mr-2 px-9 py-4'
            ></Button>
            <Button
              variant='secondary'
              ref={freeTrialRef}
              onClick={() => {
                startFreeTrial;
              }}
              text='View Plans'
              size='large'
              className=' text-grey3 px-9 py-4'
            ></Button>
          </div>
        </div>
        <div className='sm:w-1/2'>
          <Image
            src='/images/landingpagelady.png'
            alt='duro-lady'
            width={566}
            height={675}
          />
        </div>
      </div>
    </div>
  );
};
export default LandingPage;
