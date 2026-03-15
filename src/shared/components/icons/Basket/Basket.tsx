import React from "react";
import Icon from "../Icon";
import type { IconProps } from "../Icon";

const Basket: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <circle cx="10" cy="19" r="1.5" stroke="currentColor" />
    <circle cx="17" cy="19" r="1.5" stroke="currentColor" />
    <path
      d="M3.5 4H5.5L9.00446 15H17"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.22445 12.5L6.29862 6.5H18.8063C19.1476 6.5 19.3885 6.83435 19.2806 7.15811L17.614 12.1581C17.5459 12.3623 17.3548 12.5 17.1396 12.5H8.22445Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);

export default Basket;
