import React from 'react';
import Loader from '../Loader';
import './Button.css'
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({loading,children,className,disabled, ...props}) => {
  const buttonClass = `${className} ${disabled ? 'disabled' : ''} ${loading && (disabled === undefined || disabled===false) ? 'loading' : ''}`;
  return <button className={buttonClass} {...props} disabled={loading || disabled}>
    {loading! && <Loader  size='s'/>}
    {children}
  </button>
};

export default Button;
