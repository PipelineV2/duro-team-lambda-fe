import * as React from 'react';
import { IconType } from 'react-icons';
import { ImSpinner2 } from 'react-icons/im';

import clsxm from '@/lib/clsxm';

const ButtonVariant = ['primary', 'secondary', 'text'] as const;
const ButtonSize = ['small', 'large'] as const;

type ButtonProps = {
  isLoading?: boolean;
  isFullwidth?: boolean;
  variant: (typeof ButtonVariant)[number];
  size?: (typeof ButtonSize)[number];
  leftIcon?: IconType;
  rightIcon?: IconType;
  leftIconClassName?: string;
  rightIconClassName?: string;
  onClick: () => void;
  text: string;
} & React.ComponentPropsWithRef<'button'>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      text,
      className,
      disabled: buttonDisabled,
      isLoading,
      variant = 'primary',
      size = 'small',
      isFullwidth = false,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      leftIconClassName,
      rightIconClassName,
      ...rest
    },
    ref
  ) => {
    const disabled = isLoading || buttonDisabled;

    return (
      <button
        ref={ref}
        type='button'
        disabled={disabled}
        className={clsxm(
          'inline-flex items-center rounded font-medium',
          'focus-visible:ring-green focus:outline-none focus-visible:ring',
          'shadow-sm',
          'text-center transition-colors  duration-75',
          //#region  //*=========== Size ===========
          [
            size === 'large' && ['px-3 py-[14px]', 'text-sm md:text-sm'],
            size === 'small' && ['px-4 py-2.5', 'text-xs md:text-sm'],
          ],
          //#endregion  //*======== Size ===========
          //#region  //*=========== Variants ===========
          [
            variant === 'primary' && [
              'bg-green text-white',
              'border-primary-600 border',
              'hover:bg-primary-600 hover:text-white',
              'active:bg-primary-700',
              'disabled:bg-primary-700',
            ],
            variant === 'secondary' && [
              'text-green',
              'border-green border',
              'hover:bg-primary-50 active:bg-primary-100 disabled:bg-primary-100',
            ],
            variant === 'text' && [
              'text-green',
              'shadow-none',
              'hover:bg-primary-50 active:bg-primary-100 disabled:bg-primary-100',
            ],
          ],
          //#endregion  //*======== Variants ===========
          'disabled:cursor-not-allowed',
          isFullwidth && 'flex w-full items-center justify-center text-center',
          isLoading &&
            'relative text-transparent transition-none hover:text-transparent disabled:cursor-wait',
          className
        )}
        {...rest}
      >
        {isLoading && (
          <div
            className={clsxm(
              'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
              {
                'text-white': ['primary', 'dark'].includes(variant),
                'text-black': ['light'].includes(variant),
                'text-green': ['outline', 'ghost'].includes(variant),
              }
            )}
          >
            <ImSpinner2 className='animate-spin' />
          </div>
        )}
        {LeftIcon && (
          <div
            className={clsxm([
              size === 'small' && 'mr-1',
              size === 'large' && 'mr-1.5',
            ])}
          >
            <LeftIcon
              className={clsxm(
                [
                  size === 'small' && 'md:text-md text-md',
                  size === 'large' && 'md:text-md text-sm',
                ],
                leftIconClassName
              )}
            />
          </div>
        )}
        {children || text}
        {RightIcon && (
          <div
            className={clsxm([
              size === 'small' && 'ml-1',
              size === 'large' && 'ml-1.5',
            ])}
          >
            <RightIcon
              className={clsxm(
                [
                  size === 'small' && 'text-md md:text-md',
                  size === 'large' && 'md:text-md text-sm',
                ],
                rightIconClassName
              )}
            />
          </div>
        )}
      </button>
    );
  }
);

export default Button;
