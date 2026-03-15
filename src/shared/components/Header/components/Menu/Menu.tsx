import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Text from "@components/Text";
import classNames from "classnames";
import { MENU_CONFIG, type MenuItem } from "./config";
import s from "./Menu.module.scss";

interface MenuProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Menu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isOpen) return;
      const el = containerRef.current;
      if (el && !el.contains(event.target as Node)) {
        onClose?.();
      }
    };

    const handleTouchOutside = (event: TouchEvent) => {
      if (!isOpen) return;
      const el = containerRef.current;
      if (el && !el.contains(event.target as Node)) {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleTouchOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleTouchOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div
      ref={containerRef}
      className={classNames(s.menu, s.menu__mobile, { [s.menu__open]: isOpen })}
    >
      {MENU_CONFIG.map((item: MenuItem, index) => (
        <Text
          key={index}
          className={classNames(s.menu__li, isActive(item.href) ? s.menu_li_active : "", "cursor")}
        >
          <Link href={item.href} onClick={() => onClose?.()} style={{ textDecoration: "none" }}>
            {item.title}
          </Link>
        </Text>
      ))}
    </div>
  );
};

export default React.memo(Menu);
