import * as React from 'react';
import type { IconProps } from '../type';

const colorMap = {
  primary: '#000',
  secondary: '#bebbc1',
  accent: '#B5460F',
};

const CheckIcon: React.FC<IconProps> = ({
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
      viewBox={`0 0 24 24`}
      style={{ color: fillColor, ...style }}
      fill="none"
      {...props}
    >
      <path d="M4 11.6129L9.87755 18L20 7" fill="currentColor" strokeWidth="2" />
    </svg>
  );
};

export default React.memo(CheckIcon);
