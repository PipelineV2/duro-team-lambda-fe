import React from 'react';

import InfoIcon from '~/svg/InfoIcon.svg';
type Props = {
  text: string;
};

const Info = (props: Props) => {
  const { text } = props;

  return (
    <div className='bg-light-green flex gap-2 rounded px-[9.5px] py-[6px]'>
      <InfoIcon className='text-green text-base' />
      <p className='text-green text-xs'>{text}</p>
    </div>
  );
};

export default Info;
