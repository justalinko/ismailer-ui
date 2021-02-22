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

function renderMenu(menuItem: MenuItem) {
  const subMenu = menuItem.subMenu;
  return subMenu && subMenu.length > 1 ? (
    <SubMenu title={menuItem.label} icon={menuItem.icon}>
      {subMenu.map((menu) => renderMenu(menu))}
    </SubMenu>
  ) : (
    <LinkedMenu to={menuItem.to} label={menuItem.label} icon={menuItem.icon}>
      {menuItem.subMenu && menuItem.subMenu.map((menu) => renderMenu(menu))}
    </LinkedMenu>
  );
}

const MainMenu = ({ items }: MainMenuProps) => {
  return (
    <Menu mode="inline" theme="dark" inlineCollapsed={true}>
      {items.map((menu) => renderMenu(menu))}
    </Menu>
  );
};
export default MainMenu;
