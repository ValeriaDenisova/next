import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Text from "@components/Text";
import classNames from "classnames";
import { MENU_CONFIG, type MenuItem } from "./config";
import s from "./Menu.module.scss";

interface MenuProps {
  isOpen?: boolean;
}

const Menu: React.FC<MenuProps> = ({ isOpen }) => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };
  return (
    <div className={classNames(s.menu, s.menu__mobile, { [s.menu__open]: isOpen })}>
      {MENU_CONFIG.map((item: MenuItem, index) => (
        <Text
          key={index}
          className={classNames(s.menu__li, isActive(item.href) ? s.menu_li_active : "", "cursor")}
        >
          <Link href={item.href} key={index} style={{ textDecoration: "none" }}>
            {item.title}
          </Link>
        </Text>
      ))}
    </div>
  );
};

export default React.memo(Menu);
