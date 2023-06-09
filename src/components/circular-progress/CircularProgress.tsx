import React from 'react';

import clsxm from '@/lib/clsxm';

import Typography from '@/components/text';

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
      <div
        className={clsxm(
          'flex  flex-col items-center justify-center gap-4 bg-white',
          'text-grey3 rounded-full text-[40px]'
        )}
        style={{
          height: width - 8,
          width: width - 8,
        }}
      >
        <p>{progress}%</p>
        <Typography variant='body2'>Complete</Typography>
      </div>
    </div>
  );
};

export default CircularProgress;
