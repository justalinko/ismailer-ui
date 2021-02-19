import React from "react";
import { Button } from "../../Atom/Button";
import { SmtpSetting, SmtpSettingValue } from "../../Molecules/SmtpSetting";

export interface SmtpSettingPageProps {}

export interface State {
  settings: SmtpSettingValue[];
}

const SETTING_KEY = "smtp-settings";
export class SmtpSettingPage extends React.Component<SmtpSettingPageProps, State> {
  state = {
    settings: JSON.parse(localStorage.getItem(SETTING_KEY) || "[]") as SmtpSettingValue[],
  };

  onSettingUpdated(value: SmtpSettingValue, index: number) {
    const updatedArray = this.state.settings;
    updatedArray[index] = value;
    this.setState({
      settings: updatedArray,
    });

    localStorage.setItem(SETTING_KEY, JSON.stringify(updatedArray));
  }

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
          <div className="col-md-7 m-3">
            <div className="card" style={{ position: "relative" }}>
              <div className="card-body">
                {this.state.settings.map((setting, index) => (
                  <SmtpSetting
                    onValueChange={(value) => {
                      this.onSettingUpdated(value, index);
                    }}
                    key={index.toString()}
                    value={setting}
                  />
                ))}

                {this.state.settings.length > 0 && (
                  <div className="d-flex flex-column" style={{ position: "absolute", right: "10px", top: "10px" }}>
                    <Button button="save" />
                    <Button button="export" />
                  </div>
                )}
                <Button button="Add" onClick={() => this.onAddSetting()} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
