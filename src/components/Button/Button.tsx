import React, { useMemo } from 'react';

import Loader from '../Loader';

import styles from './Button.module.scss';
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  children: React.ReactNode;
  color?: 'primary' | 'secondary' | 'accent';
};

const Button: React.FC<ButtonProps> = ({
  loading,
  children,
  className,
  disabled,
  color,
  ...props
}) => {
  const buttonClass = useMemo(
    () =>
      `${className} ${styles.button} ${disabled ? 'disabled' : ''} ${loading && (disabled === undefined || disabled === false) ? 'loading' : ''}`,
    [className, loading, disabled]
  );
  return (
    <button className={buttonClass} {...props} disabled={loading || disabled}>
      {loading ? <Loader size="s" color={color} /> : children}
    </button>
  );
};

export default Button;
