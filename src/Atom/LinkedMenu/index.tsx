import { Menu, MenuItemProps } from "antd";
import { FunctionComponent } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

export interface LinkedMenuProps extends RouteComponentProps<{}>, MenuItemProps {
  to?: string;
  label: string;
}

const LinkedMenu: FunctionComponent<LinkedMenuProps> = ({ label, to, history, onClick, ...props }) => {
  return (
    <Menu.Item
      onClick={(e) => {
        if (to) {
          history.push(to);
        }

        if (onClick) {
          onClick(e);
        }
      }}
      {...props}
    >
      {label}
    </Menu.Item>
  );
};

export default withRouter(LinkedMenu);
