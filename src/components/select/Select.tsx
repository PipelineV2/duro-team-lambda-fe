import { useField } from 'formik';
import React from 'react';

import clsxm from '@/lib/clsxm';

import DownwardCaret from '~/svg/DownwardCaret.svg';

export interface ISelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  placeholder: string;
  options: string[] | { value: string; label: string }[];
  name: string;
}

const Select = (props: ISelectProps) => {
  const [field, meta, helpers] = useField(props);
  const { label, placeholder, options, className, name } = props;

  const onChange = (e: any) => {
    helpers.setTouched(true);
    helpers.setValue(e.target.value);
  };

  return (
    <div className='block w-full'>
      <label
        htmlFor={label}
        className={clsxm('text-grey1 mb-2 block text-base', [
          meta.error && 'text-red',
        ])}
      >
        {label}
      </label>
      <div className='relative w-full'>
        <select
          {...field}
          title={label}
          id={label}
          name={name}
          onChange={onChange}
          className={clsxm(
            'w-full appearance-none caret-transparent',
            'border-gray2 text-grey1 rounded border px-4 py-3 text-base  disabled:cursor-not-allowed',
            'focus:border-black focus:outline-none  focus:ring-black',
            [
              meta.error &&
                'border-red text-red focus:border-red focus:ring-red',
            ],
            [className]
          )}
        >
          <option value=''>{placeholder}</option>
          {options.map((item) => {
            if (typeof item === 'string') {
              return (
                <option value={item} key={item}>
                  {item}
                </option>
              );
            }
            return (
              <option value={item.value} key={item.value}>
                {item.label}
              </option>
            );
          })}
        </select>
        <DownwardCaret
          className={clsxm(
            'text-border-gray2 absolute right-4 top-3 bg-white text-2xl',
            [meta.error && 'text-red']
          )}
        />
        {meta.touched && meta.error ? (
          <p className='text-red pt-1 text-xs'>{meta.error}</p>
        ) : null}
      </div>
    </div>
  );
};

export default Select;
