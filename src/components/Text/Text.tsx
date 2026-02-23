import * as React from 'react';
import './Text.css';

export type TextProps = {
  className?: string;
  view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14' | 'p-12';
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  weight?: 'normal' | 'medium' | 'bold';
  children: React.ReactNode;
  color?: 'primary' | 'secondary' | 'accent';
  maxLines?: number;
};

const Text: React.FC<TextProps> = ({
  className = '',
  view,
  tag = 'p',
  weight,
  children,
  color,
  maxLines,
}) => {
  const classes = [
    className,
    view ? `text-${view}` : '',
    weight ? `text-weight-${weight}` : '',
    color ? `text-color-${color}` : '',
  ]
    .filter(Boolean)
    .join(' ');
  const Component = tag;
  const style = maxLines ? { WebkitLineClamp: maxLines } : undefined;
  return (
    <Component data-testid="text" className={classes} style={style}>
      {children}
    </Component>
  );
};

export default Text;