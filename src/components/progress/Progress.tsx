import React, { CSSProperties } from 'react';

import clsxm from '@/lib/clsxm';

type Props = {
  currentStep: number;
  totalStep: number;
  className?: string | undefined;
  style?: CSSProperties;
};

const Progress = (props: Props) => {
  const { currentStep, totalStep, className, style } = props;
  if (currentStep > totalStep) {
    return null;
  }
  return (
    <div className={className} style={style}>
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
