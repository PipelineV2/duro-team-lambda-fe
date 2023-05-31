import React from 'react';

import clsxm from '@/lib/clsxm';

type Props = {
  progress: number;
  width?: number;
};

const CircularProgress = (props: Props) => {
  const { progress, width = 200 } = props;

  return (
    <div
      className={clsxm('grid  place-items-center bg-[#E0E0E0]', `rounded-full`)}
      style={{
        background: `conic-gradient(#ffa500 0 ${progress}%, #E0E0E0 ${progress}% 100%)`,
        height: width,
        width: width,
      }}
    >
      <p
        className={clsxm(
          'grid  place-items-center bg-white',
          'text-grey3 rounded-full text-[40px]'
        )}
        style={{
          height: width - 8,
          width: width - 8,
        }}
      >
        {progress}%
      </p>
    </div>
  );
};

export default CircularProgress;
