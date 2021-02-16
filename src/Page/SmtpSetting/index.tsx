import { Input } from "../../Atom/Input";
import { Button } from "../../Atom/Button";
import React from "react";

export interface SmtpSettingPageProps {}

export interface SmtpSetting {
  host: string;
  port: string;
  user: string;
  password: string;
}

export interface State {
  settings: SmtpSetting[];
}
export class SmtpSettingPage extends React.Component<SmtpSettingPageProps, State> {
  state = {
    settings: [] as SmtpSetting[],
  };

  onAddSetting() {
    this.setState((previousState) => {
      return {
        settings: [
          ...previousState.settings,
          {
            host: "",
            password: "",
            port: "",
            user: "",
          },
        ],
      };
    });
  }

  render() {
    return (
      <div style={{ marginLeft: "25%" }}>
        <div className="d-flex justify-content-center py-3 w3-red">
          <h1>SMTP Setting</h1>
        </div>

        <div className="row">
          <div className="col-md-6 m-3">
            <div className="card">
              <div className="card-body">
                {this.state.settings.map((setting, index) => (
                  <div key={index}>
                    <Input label="Host" value={setting.host} />
                    <Input label="Port" value={setting.port} />
                    <Input label="User" value={setting.user} />
                    <Input label="Password" value={setting.password} />
                  </div>
                ))}
                <Button button="Add" onClick={() => this.onAddSetting()} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
