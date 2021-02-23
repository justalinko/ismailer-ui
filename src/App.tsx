import { InfoCircleOutlined, MailOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SafetyCertificateOutlined, SendOutlined, SettingOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import "antd/dist/antd.css";
import { Footer } from "antd/lib/layout/layout";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import MainMenu from "./Molecules/MainMenu";
import { SmtpSettingPage } from "./Page/SmtpSetting";

const { Header, Sider, Content } = Layout;

class App extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Router>
        <Layout style={{ height: "100vh" }}>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="logo" />
            <MainMenu
              inlineCollapsed={this.state.collapsed}
              items={[
                {
                  label: "Setting",
                  icon: <SettingOutlined />,
                  subMenu: [
                    {
                      label: "SMTP Setting",
                      icon: <MailOutlined />,
                    },
                    {
                      label: "Sender Setting",
                      icon: <SendOutlined />,
                    },
                  ],
                },
                {
                  label: "Email Sending",
                  icon: <SendOutlined />,
                },
                {
                  label: "About",
                  icon: <InfoCircleOutlined />,
                  subMenu: [
                    {
                      label: "License",
                      icon: <SafetyCertificateOutlined />,
                    },
                    {
                      label: "About This Program",
                      icon: <InfoCircleOutlined />,
                    },
                  ],
                },
              ]}
            />
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
              {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: "trigger",
                onClick: this.toggle,
              })}
            </Header>
            <Content
              className="site-layout-background"
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
                overflow: "scroll",
              }}
            >
              <SmtpSettingPage />
            </Content>
            <Footer about="test">Footer</Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;
