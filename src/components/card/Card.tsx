//"@typescript-eslint/no-explicit-any": "off"

import React from 'react';

import Typography from '@/components/text';

import DatabaseIcon from '~/svg/DatabaseIcon.svg';

type Props = {
  icon?: any;
  label: string;
  stat: number;
};

const Card = (props: Props) => {
  const { icon: Icon, label, stat } = props;
  return (
    <div className='shadow-s2 w-full  rounded-lg bg-white p-[18px] pl-[34px]'>
      <div className='mb-6'>
        {Icon ? (
          <Icon className='text-[32px]' />
        ) : (
          <DatabaseIcon className='text-[32px]' />
        )}
      </div>
      <Typography
        variant='h2'
        className='text-grey2 mb-1 text-[40px] font-medium leading-[48px]'
      >
        {stat}
      </Typography>
      <Typography variant='body2' className='text-grey3'>
        {label}
      </Typography>
    </div>
  );
};

export default Card;
