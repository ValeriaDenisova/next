import * as React from 'react';
import type { IconProps } from '../type';

const colorMap = {
  primary: '#000',
  secondary: '#bebbc1',
  accent: '#B5460F',
};

const ArrowDownIcon: React.FC<IconProps> = ({
  className,
  color,
  width = 24,
  height = 24,
  style,
  ...props
}) => {
  const fillColor = color ? colorMap[color] : '#000';
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ color: fillColor, ...style }}
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.33563 8.74741L3.66436 7.25259L12 14.662L20.3356 7.25259L21.6644 8.74741L12 17.338L2.33563 8.74741Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default React.memo(ArrowDownIcon);
