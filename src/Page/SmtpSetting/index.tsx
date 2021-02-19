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

        <div className="row" style={{ marginBottom : '100px' }}>
         
            
              
                {this.state.settings.map((setting, index) => (
                  <SmtpSetting
                    onValueChange={(value) => {
                      this.onSettingUpdated(value, index);
                    }}
                    key={index.toString()}
                    value={setting}
                  />
                ))}

              
              
            
          
        </div>
        <div className="bg-white shadow-lg w-100" style={{ display : 'flex' , position: 'fixed' , bottom: '0' , height:'fit-content' , padding: '15px 20px' , boxSizing: 'border-box'  }}>
          <Button button="Add" onClick={() => this.onAddSetting()} />
          {this.state.settings.length > 0 && (
            <div className="d-flex ml-4">
              <Button button="save"  />
              <Button button="export" />
            </div>
          )}
        </div>
                
      </div>
    );
  }
}
