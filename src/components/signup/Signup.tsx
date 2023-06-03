import Link from 'next/link';
import React, { useState } from 'react';

import Progress from '@/components/progress';
import Typography from '@/components/text';

import SignupPageOne from './SignupPageOne';
import SignupPageThree from './SignupPageThree';
import SignupPageTwo from './SignupPageTwo';

import DuroLogo from '~/svg/Duro.svg';

const Signup = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const goToNextStep = () => {
    setCurrentStep((step) => step + 1);
  };
  return (
    <main className='h-screen w-screen p-3 '>
      <div className='m-auto w-full max-w-[418px] pt-5 md:pt-20 lg:pt-[105px]'>
        <Link href='/'>
          <DuroLogo className='text-green m-auto mb-4  h-[40px] w-[120px] md:mb-8 lg:mb-16 lg:h-[55px] lg:w-[142px] ' />
        </Link>
        <Typography variant='h3' className='mb-6 text-center'>
          {currentStep === 1
            ? 'Start your free Duro trial'
            : 'Create your duro account'}
        </Typography>
        <Progress currentStep={currentStep} totalStep={3} className='mb-9' />
        {currentStep === 1 && <SignupPageOne goToNextStep={goToNextStep} />}
        {currentStep === 2 && <SignupPageTwo goToNextStep={goToNextStep} />}
        {currentStep === 3 && <SignupPageThree />}
      </div>
    </main>
  );
};

export default Signup;
