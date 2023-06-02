import React, { CSSProperties } from 'react';

import clsxm from '@/lib/clsxm';

import InfoIcon from '~/svg/InfoIcon.svg';

type Props = {
  text: string;
  className?: string | undefined;
  style?: CSSProperties;
};

const Info = (props: Props) => {
  const { text, className, style } = props;

  return (
    <div
      className={clsxm(
        `bg-light-green flex gap-2 rounded px-[9.5px] py-[6px]`,
        className
      )}
      style={style}
    >
      <InfoIcon className='text-green text-base' />
      <p className='text-green text-xs'>{text}</p>
    </div>
  );
};

export default Info;
