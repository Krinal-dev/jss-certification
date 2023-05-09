// Global
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import React, { MouseEventHandler, Ref } from 'react';
import clsx from 'clsx';
import { tv } from 'tailwind-variants';

// Local
import FontAwesomeIcon from '../FontAwesomeIcon/FontAwesomeIcon';

export const BUTTON_TYPES = [
  'default',
  'secondary',
  'abort',
  'errorblack',
  'errorwhite',
  'success',
  'warning',
];

interface Props {
  auto?: boolean;
  disabled?: boolean;
  iconLeft?: string;
  iconRight?: string;
  id?: string;
  label?: string;
  loading?: boolean;
  onClick?: MouseEventHandler;
  ref?: Ref<HTMLButtonElement | null>;
  tag?: string;
  title?: string;
  type: string;
}

type NativeAttrs = Omit<React.ButtonHTMLAttributes<any>, keyof Props>;

export type ButtonProps = Props & NativeAttrs;

const buttonSlots = tv({
  slots: {
    text: clsx(
      'gap-4',
      'h-10',
      'inline-flex',
      'items-center',
      'justify-center',
      'leading-10',
      'relative',
      '-top-px'
    ),
  },
});

const buttonVariants = tv({
  base: clsx(
    'disabled:bg-gray-light',
    'disabled:cursor-not-allowed',
    'disabled:text-gray',
    'enabled:duration-150',
    'enabled:transition',
    'hover:ease-in',
    'h-10',
    'inline-block',
    'leading-10',
    'py-0',
    'px-4',
    'rounded-md',
    'text-center',
    'whitespace-nowrap'
  ),
  defaultVariants: {
    type: 'default',
  },
  variants: {
    type: {
      default: clsx(
        'bg-primary',
        'hover:text-theme-btn-primary-text/50',
        'text-theme-btn-primary-text'
      ),
      secondary: clsx('bg-rose-dark', 'hover:text-white/50', 'text-white'),
      abort: clsx('bg-salmon'),
      errorblack: clsx('bg-error-black', 'hover:text-white/50', 'text-white'),
      errorwhite: clsx('bg-error-white', 'hover:text-white/50', 'text-white'),
      success: clsx('bg-beige', 'hover:text-black/50', 'text-black'),
      warning: clsx('bg-orange', 'hover:text-white/50', 'text-white'),
    },
    minWidth: {
      true: clsx('min-w-[10rem]'),
    },
  },
});

const Button = ({
  auto = false,
  disabled = false,
  iconLeft,
  iconRight,
  id,
  label,
  loading = false,
  onClick = () => {},
  ref,
  tag = 'button',
  title,
  type = 'default',
}: ButtonProps) => {
  const { text } = buttonSlots();
  const children = (
    <>
      <div className={text()}>
        {iconLeft && <FontAwesomeIcon icon={iconLeft as IconProp} />}
        {loading && <FontAwesomeIcon icon={'spinner'} spinPulse />}
        {label && !loading && label}
        {iconRight && <FontAwesomeIcon icon={iconRight as IconProp} />}
      </div>
    </>
  );
  const className = buttonVariants({ minWidth: !auto, type });

  return React.createElement(
    tag,
    {
      className,
      disabled,
      id,
      onClick: (evt: React.MouseEvent<Element, MouseEvent>) => onClick(evt),
      ref,
      title,
    },
    children
  );
};

export default Button;
