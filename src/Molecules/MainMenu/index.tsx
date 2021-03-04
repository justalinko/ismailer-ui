import { Menu, MenuProps } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import React, { ReactNode } from "react";
import LinkedMenu from "../../Atom/LinkedMenu";

export interface MainMenuProps extends MenuProps {
  items: MenuItem[];
}

export interface MenuItem {
  label: string;
  to?: string;
  icon?: ReactNode;
  subMenu?: MenuItem[];
}

function renderMenu(menuItem: MenuItem, key: React.Key) {
  const subMenu = menuItem.subMenu;
  return subMenu && subMenu.length > 1 ? (
    <SubMenu key={"sub" + key} title={menuItem.label} icon={menuItem.icon}>
      {subMenu.map((menu, index) => renderMenu(menu, index + menu.label))}
    </SubMenu>
  ) : (
    <LinkedMenu key={key} to={menuItem.to} label={menuItem.label} icon={menuItem.icon}>
      {menuItem.subMenu && menuItem.subMenu.map((menu, index) => renderMenu(menu, index + menu.label))}
    </LinkedMenu>
  );
}

const MainMenu = ({ items, ...props }: MainMenuProps) => {
  return (
    <Menu mode="inline" theme="dark" {...props}>
      {items.map((menu, index) => renderMenu(menu, index + menu.label))}
    </Menu>
  );
};
export default MainMenu;
