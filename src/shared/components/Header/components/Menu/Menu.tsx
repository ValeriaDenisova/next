import React from 'react';
import Text from '@components/Text';
import classNames from 'classnames';
import { MENU_CONFIG, type MenuItem } from './config';
import s from './Menu.module.scss';

interface MenuProps {
  isOpen?: boolean;
}

const Menu: React.FC<MenuProps> = ({ isOpen }) => {
  return (
    <div className={classNames(s.menu, s.menu__mobile, { [s.menu__open]: isOpen })}>
      {MENU_CONFIG.map((item: MenuItem, index) => (
        <Text key={index} className={classNames(s.menu__li, index === 0 ? s.menu_li_active : '')}>
          {item.title}
        </Text>
      ))}
    </div>
  );
};

export default React.memo(Menu);
