import Link from 'next/link';
import React from 'react';

import Button from '@/components/buttons/Button';
import Input from '@/components/input';
import Typography from '@/components/text';

import DuroLogo from '~/svg/Duro.svg';

const SignupPageThree = () => {
  return (
    <main className='h-screen w-screen p-3 '>
      <div className='m-auto w-full max-w-[418px] pt-5 md:pt-20 lg:pt-[105px]'>
        <Link href='/'>
          <DuroLogo className='text-green m-auto mb-4  h-[40px] w-[120px] md:mb-8 lg:mb-16 lg:h-[55px] lg:w-[142px] ' />
        </Link>
        <Typography variant='h3' className='mb-6 text-center'>
          Welcome back
        </Typography>
        <div className='mb-8 space-y-4'>
          <Input
            label='Email'
            placeholder='example@workmail.com'
            name='email'
            type='email'
          />

          <Input
            label='Password'
            placeholder=''
            name='password'
            type='password'
          />
          <Link
            href='/forgot-password'
            className='text-green text-sm font-medium leading-5'
          >
            Forgot password?
          </Link>
        </div>
        <Button
          text='Sign in'
          onClick={() => undefined}
          variant='primary'
          size='large'
          isFullwidth
          className='mb-6'
        />
      </div>
    </main>
  );
};

export default SignupPageThree;
