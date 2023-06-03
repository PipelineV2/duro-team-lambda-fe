import React from 'react';

import Typography from '@/components/text';

export interface CheckProps {
  label: string;
  value: string;
  isRow: boolean;
}

const Checkbox = (props: CheckProps) => {
  const { label, value, isRow } = props;

  return (
    <div>
      <div className={` ${!isRow && ' flex-col'} flex items-center`}>
        <input
          type='checkbox'
          name={value}
          id={value}
          value={value}
          className={` ${
            isRow && 'mr-[0.5rem]'
          } text-green  rounded-sm focus:ring-0 focus:ring-offset-0`}
        />
        <label htmlFor={value}>
          <Typography variant='secondary'>{label}</Typography>
        </label>
      </div>
    </div>
  );
};

export default Checkbox;
