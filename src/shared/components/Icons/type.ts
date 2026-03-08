type ColorType = 'primary' | 'secondary' | 'accent';

export interface IconProps {
  className: string;
  color: ColorType;
  width: number;
  height: number;
  style?: React.CSSProperties;
}
