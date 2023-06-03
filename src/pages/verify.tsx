import Link from 'next/link';
import React from 'react';

import Button from '@/components/buttons';
import Typography from '@/components/text';

import DuroLogo from '~/svg/Duro.svg';

const Verify = () => {
  return (
    <main className='h-screen w-screen p-3 '>
      <div className='m-auto w-full max-w-[418px] pt-5 md:pt-20 lg:pt-[105px]'>
        <Link href='/'>
          <DuroLogo className='text-green m-auto mb-4  h-[40px] w-[120px] md:mb-8 lg:mb-16 lg:h-[55px] lg:w-[142px]' />
        </Link>
        <Typography variant='h3' className='mb-6 text-center'>
          Now verify your account.
        </Typography>

        <Typography variant='body2' className='text-gray2 mb-6 text-center'>
          We’ve sent a verification link to the work mail you registered with
        </Typography>

        <Typography variant='body2' className='text-gray2 mb-0.5 text-center'>
          Didn’t receive the link?
        </Typography>

        <div className='flex justify-center'>
          <Button
            text='Next'
            onClick={() => undefined}
            variant='text'
            size='large'
          >
            Resend mail
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Verify;
