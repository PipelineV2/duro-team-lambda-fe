import React from 'react';

import clsxm from '@/lib/clsxm';

type Props = {
  currentStep: number;
  totalStep: number;
};

const Progress = (props: Props) => {
  const { currentStep, totalStep } = props;
  if (currentStep > totalStep) {
    return null;
  }
  return (
    <div>
      <div className='mb-2 flex h-1 w-full gap-2'>
        {Array.from(Array(totalStep), (e, i) => i + 1).map((item) => (
          <div
            key={item}
            className={clsxm(
              'bg-grey5 h-1 w-full transition-all duration-200',
              [item <= currentStep && 'bg-green']
            )}
          />
        ))}
      </div>
      <p className='text-grey2 text-xs'>
        Step {currentStep} of {totalStep}
      </p>
    </div>
  );
};

export default Progress;
