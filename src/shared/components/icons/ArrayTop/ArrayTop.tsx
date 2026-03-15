import React from "react";
import Icon from "../Icon";
import type { IconProps } from "../Icon";

const ArrayTop: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <rect width="48" height="48" fill="white" fillOpacity="0.01" />
    <path
      d="M24 6L24 42"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 18L24 6L36 18"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);

export default ArrayTop;
