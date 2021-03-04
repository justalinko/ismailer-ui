import { InfoCircleOutlined, MailOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SafetyCertificateOutlined, SendOutlined, SettingOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import "antd/dist/antd.css";
import { Footer } from "antd/lib/layout/layout";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import MainMenu from "./Molecules/MainMenu";
import { AboutPage } from "./Page/About";
import { LicensePage } from "./Page/License";
import { SenderSettingPage } from "./Page/SenderSetting";
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
    console.log(this.state.collapsed);

    return (
      <Router>
        <Layout style={{ height: "100vh" }}>
          <Sider collapsible collapsed={this.state.collapsed}>
            <div className="logo" />
            <MainMenu
              inlineCollapsed={false}
              items={[
                {
                  label: "Setting",
                  icon: <SettingOutlined />,
                  subMenu: [
                    {
                      label: "SMTP Setting",
                      icon: <MailOutlined />,
                      to: "/smtp-setting",
                    },
                    {
                      label: "Sender Setting",
                      icon: <SendOutlined />,
                      to: "/sender-setting",
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
                      to: "/license",
                    },
                    {
                      label: "About This Program",
                      icon: <InfoCircleOutlined />,
                      to: "/about",
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
                padding: 24,
                minHeight: 280,
                overflow: "scroll",
              }}
            >
              <Switch>
                <Route exact path="/smtp-setting" component={SmtpSettingPage} />
                <Route exact path="/sender-setting" component={SenderSettingPage} />
                <Route exact path="/license" component={LicensePage} />
                <Route exact path="/about" component={AboutPage} />
              </Switch>
            </Content>
            <Footer about="test">Footer</Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;
