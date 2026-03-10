import React from "react";
import classNames from "classnames";
import s from "./Icon.module.scss";

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: "primary" | "secondary";
};

const Icon: React.FC<IconProps> = ({
  className,
  color,
  width = 24,
  height = 24,
  children,
  ...props
}) => {
  const iconClass = classNames(
    s.icon,
    {
      [s[`icon--color-${color}`]]: color,
    },
    className,
  );
  const viewBox = `0 0 ${width} ${height}`;

  return (
    <svg className={iconClass} width={width} height={height} viewBox={viewBox} {...props}>
      {children}
    </svg>
  );
};

export default Icon;
