import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer, MenuProps } from "antd";
import React, { useState } from "react";
import logo from "./../../logo.svg";
import "./style.css";

export interface NavBarProps {
  menu: React.ReactElement<MenuProps>;
  title: string;
}

const NavBar = ({ menu, title }: NavBarProps) => {
  const [visible, setVisible] = useState(false);
  return (
    <nav className="navbar">
      <Button className="menu" type="primary" icon={<MenuOutlined />} onClick={() => setVisible(true)} />
      <Drawer title={title} placement="left" onClose={() => setVisible(false)} visible={visible}>
        {menu}
      </Drawer>
      <a href="/">
        <img src={logo} className="logo" alt="logo" />
      </a>
    </nav>
  );
};

export default NavBar;
