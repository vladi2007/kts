import React from 'react';

import styles from './Text.module.scss';

export type TextProps = {
  className?: string;
  view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14' | 'p-12' | 'p-10';
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  weight?: 'normal' | 'medium' | 'bold';
  children: React.ReactNode;
  color?: 'primary' | 'secondary' | 'accent';
  maxLines?: number;
  onClick?: React.MouseEventHandler<HTMLElement>;
};

const Text: React.FC<TextProps> = ({
  className,
  view,
  tag = 'p',
  weight,
  children,
  color,
  maxLines,
  onClick,
}) => {
  const classes = [
    styles.text,
    view ? styles[`text__${view}`] : '',
    weight ? styles[`text__weight-${weight}`] : '',
    color ? styles[`text__color-${color}`] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const Component = tag;
  const style = maxLines ? { WebkitLineClamp: maxLines } : undefined;

  return (
    <Component className={classes} style={style} onClick={onClick}>
      {children}
    </Component>
  );
};

export default Text;
