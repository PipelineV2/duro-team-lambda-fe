import clsx from 'clsx';
import React, { CSSProperties, ReactNode } from 'react';

const TextVariant = [
  'h1',
  'h2',
  'h3',
  'h4',
  'small',
  'button',
  'secondary',
  'body2',
  'body1',
] as const;

type TextProps = {
  color?: string;
  variant: (typeof TextVariant)[number];
  className?: string | undefined;
  style?: CSSProperties;
  children: ReactNode | string;
};

const Typography: React.FC<TextProps> = ({
  color,
  variant = 'body1',
  className,
  style,
  children,
}) => {
  const tagStyle = useTextVariant(variant);
  const tag = variant.startsWith('h') ? `h${variant.charAt(1)}` : 'p';
  const additionalClasses = className
    ? `${tagStyle} ${className}`
    : `${tagStyle}`;

  const Component = React.createElement(
    tag,
    {
      style: (style || color) && { ...style, ...{ color: color || '' } },
      className: additionalClasses && additionalClasses,
    },
    children
  );

  return Component;
};

export default Typography;

const useTextVariant = (variant: (typeof TextVariant)[number]) => {
  const style = {
    h1: clsx('font-bold text-[3.5rem] leading-[4.75rem]'),
    h2: clsx('font-bold text-[3rem] leading-[4.1875rem]'),
    h3: clsx('font-semibold text-[2rem] leading-[2.8125rem]'),
    h4: clsx('font-medium text-2xl leading-[2.125rem]'),
    small: clsx('font-medium text-2xl leading-[1.25rem]'),
    button: clsx('font-medium text-sm leading-[1.25rem]'),
    secondary: clsx('text-xs leading-[1.0625rem]'),
    body2: clsx('text-base leading-[1.375rem]'),
    body1: clsx('text-xl leading-[1.75rem]'),
  };

  return style[variant];
};
