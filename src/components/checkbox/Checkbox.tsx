import { useField } from 'formik';
import React from 'react';

import clsxm from '@/lib/clsxm';

import Typography from '@/components/text';

export interface CheckProps {
  label: string;
  name: string;
  isRow?: boolean;

  checked?: boolean;
  value?: string;
  type?: 'checkbox' | 'radio';
}

const Checkbox = (props: CheckProps) => {
  const [field] = useField({
    name: props.name,
    value: props.value,
    type: props.type,
  });
  const {
    label,
    value,
    isRow = true,
    name,
    type = 'checkbox',
    checked,
  } = props;
  return (
    <div>
      <div className={` ${!isRow && ' flex-col'} flex items-center`}>
        <input
          {...field}
          // {...props}
          type={type}
          name={name}
          id={value || name}
          checked={checked}
          // checked={type === 'radio' ? value : undefined }
          // value={value}
          // onChange={(e) => onChange(e.target.value)}
          className={clsxm(
            'text-green :checked:bg-red h-5 w-5 rounded focus:ring-0 focus:ring-offset-0',
            [isRow && 'mr-[0.5rem]', !isRow && 'mb-[0.5rem]'],
            [type === 'radio' && 'rounded-full']
          )}
        />
        <label htmlFor={value || name}>
          <Typography variant='button' className='text-grey2 cursor-pointer'>
            {label}
          </Typography>
        </label>
      </div>
    </div>
  );
};

export default Checkbox;
