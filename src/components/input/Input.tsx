import { useField } from 'formik';
import React, { CSSProperties, useState } from 'react';

import clsxm from '@/lib/clsxm';

import EyeCrossedIcon from '~/svg/EyeCrossedIcon.svg';
import EyeIcon from '~/svg/EyeIcon.svg';

export interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder: string;
  // error?: boolean | string;
  className?: string | undefined;
  style?: CSSProperties;
  name: string;

  // type?: HTMLInputTypeAttribute;
  /**
   * used when input value is determined by api that needs to be loaded
   */
  // isLoading?: boolean;
}

const Input = (props: IInputProps) => {
  const [field, meta] = useField(props);
  const { label, type = 'text', className, style, name } = props;

  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const handlePasswordType = () => {
    if (type !== 'password') {
      return type;
    }

    return isPasswordShown ? 'text' : 'password';
  };

  const handleTogglePasswordVisibility = () => {
    return setIsPasswordShown((shown) => !shown);
  };

  // console.log({ field, meta, helpers });

  return (
    <div className={clsxm('block w-full')} style={style}>
      <label
        htmlFor={name}
        className={clsxm('text-grey1 mb-2 block text-base', [
          meta.error && 'text-red',
        ])}
      >
        {label}
      </label>
      <div className='relative w-full'>
        <input
          {...field}
          {...props}
          type={handlePasswordType()}
          title={label}
          name={name}
          id={name}
          className={clsxm(
            'placeholder:text-grey4 w-full placeholder:text-base',
            'border-grey2 text-grey1 rounded border px-4 py-3 text-base  disabled:cursor-not-allowed',
            'focus:border-black focus:outline-none  focus:ring-black',
            [
              meta.error &&
                'border-red text-red focus:border-red focus:ring-red',
            ],
            [type === 'password' && 'pr-12'],
            [className]
          )}
        />
        {type === 'password' && (
          <button
            onClick={handleTogglePasswordVisibility}
            className='absolute right-4 top-3 h-6 w-6'
          >
            {isPasswordShown ? (
              <EyeCrossedIcon className='text-green text-2xl' />
            ) : (
              <EyeIcon className='text-green text-2xl' />
            )}
          </button>
        )}
        {meta.touched && meta.error ? (
          <p className='text-red pt-1 text-xs'>{meta.error}</p>
        ) : null}
      </div>
    </div>
  );
};

export default Input;
