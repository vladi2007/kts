import * as React from 'react';
import { useMemo } from 'react';
import 'styles/colors.scss';

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: 'primary' | 'secondary' | 'accent' | 'disabled';
  width?: number;
  height?: number;
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({
  className = '',
  color,
  width = 24,
  height = 24,
  stroke,
  ...props
}) => {
  const getColor = useMemo(
    () => (color?: 'primary' | 'secondary' | 'accent' | 'disabled') => {
      switch (color) {
        case 'primary':
          return 'var(--color-black)';
        case 'secondary':
          return 'var(--color-gray)';
        case 'accent':
          return 'var(--color-primary)';
        case 'disabled':
          return '#00000033';
        default:
          return 'currentColor';
      }
    },
    []
  );
  const strokeField = useMemo(
    () => (stroke === 'none' ? 'none' : getColor(color)),
    [stroke, getColor, color]
  );
  return (
    <svg
      className={className}
      width={width}
      height={height}
      fill={getColor(color)}
      stroke={strokeField}
      {...props}
    ></svg>
  );
};

export default Icon;
