import React from 'react';

import styles from './Input.module.scss';
export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  value: string;
  onChange: (value: string) => void;
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, placeholder, afterSlot, disabled, className, ...props }, ref) => {
    const inputStyle: React.CSSProperties = {
      boxSizing: 'border-box',
      border: 'none',
      fontFamily: 'Roboto',
      fontWeight: 400,
      fontSize: 16,
      width: '300px',
      height: 40,
    };
    const wrapperStyle: React.CSSProperties = {
      height: 52,
      fontFamily: 'Roboto',
      fontWeight: 400,
      fontSize: 16,
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
    };

    const wrapperClassNames = [
      styles.wrapper,
      className,
      disabled ? styles['wrapper__input-disabled'] : '',
      value ? styles['input-not-empty'] : styles['input-empty'],
    ]
      .filter(Boolean)
      .join(' ');
    return (
      <div className={wrapperClassNames} style={{ ...wrapperStyle, position: 'relative' }}>
        <input
          type="text"
          ref={ref}
          className={styles.input}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ ...inputStyle, width: '100%', paddingRight: 40 }} // paddingRight под слот
          placeholder={placeholder}
          disabled={disabled}
          {...props}
        />
        {afterSlot && (
          <div
            className={styles.slot}
            style={{
              position: 'absolute',
              right: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
            }}
          >
            {afterSlot}
          </div>
        )}
      </div>
    );
  }
);

export default Input;
