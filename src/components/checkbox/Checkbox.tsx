import React from 'react';

import clsxm from '@/lib/clsxm';

import Typography from '@/components/text';

export interface CheckProps {
  label: string;
  value: string;
  isRow?: boolean;
}

const Checkbox = (props: CheckProps) => {
  const { label, value, isRow = true } = props;

  return (
    <div>
      <div className={` ${!isRow && ' flex-col'} flex items-center`}>
        <input
          type='checkbox'
          name={value}
          id={value}
          value={value}
          className={clsxm(
            'text-green h-5 w-5 rounded focus:ring-0 focus:ring-offset-0',
            [isRow && 'mr-[0.5rem]', !isRow && 'mb-[0.5rem]']
          )}
        />
        <label htmlFor={value}>
          <Typography variant='button' className='text-grey2'>
            {label}
          </Typography>
        </label>
      </div>
    </div>
  );
};

export default Checkbox;
