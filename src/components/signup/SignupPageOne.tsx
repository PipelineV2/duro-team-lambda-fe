import Link from 'next/link';
import React from 'react';

import Button from '@/components/buttons/Button';
import Info from '@/components/info';
import Input from '@/components/input';
import Typography from '@/components/text/Text';

type Props = {
  goToNextStep: () => void;
};

const SignupPageOne = (props: Props) => {
  const { goToNextStep } = props;
  return (
    <>
      <Input
        label='Work Email'
        placeholder='adeleke@crystalbank.com'
        className='mb-2'
        name='email'
      />
      <Info
        text='Use your work email for smooth integrations and use'
        className='mb-8'
      />
      <Button
        text='Next'
        onClick={goToNextStep}
        variant='primary'
        size='large'
        isFullwidth
        className='mb-6'
      >
        Next
      </Button>
      <div className='flex items-center justify-center gap-6'>
        <Typography variant='secondary' className='text-gray3'>
          Already have an account?
        </Typography>
        <Link
          href='/login'
          className='text-green text-sm font-medium leading-5'
        >
          Login
        </Link>
      </div>
    </>
  );
};

export default SignupPageOne;
