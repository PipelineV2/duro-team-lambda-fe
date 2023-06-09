import React from 'react';

import clsxm from '@/lib/clsxm';

import Typography from '@/components/text';

export interface CheckProps {
  label: string;
  value: string;
  checked?: boolean;
  isRow?: boolean;
  onChange: (val: string) => void;
}

const Checkbox = (props: CheckProps) => {
  const { onChange, label, value, isRow = true, checked = false } = props;

  return (
    <div>
      <div className={` ${!isRow && ' flex-col'} flex items-center`}>
        <input
          type='checkbox'
          name={value}
          id={value}
          checked={checked}
          value={value}
          onChange={(e) => onChange(e.target.value)}
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
