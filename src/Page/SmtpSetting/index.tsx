import { Input } from "../../Atom/Input";
import { Button } from "../../Atom/Button";
import {Checkbox} from '../../Atom/checkbox'
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
    save :  false
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

  addSaveButton(){
    // this.setState( {
    //   save : <Button button="save" />
      
    // })
  }

  render() {
    {
    
      if(this.state.settings.length === 1 ){
        this.addSaveButton()
      }
     }
    return (
      <div style={{ marginLeft: "25%" }}>
        <div className="d-flex justify-content-center py-3 w3-red">
          <h1>SMTP Setting</h1>
        </div>

        <div className="row">
          <div className="col-md-7 m-3">
            <div className="card" style={{ position: 'relative' }}>
              <div className="card-body">
                {this.state.settings.map((setting, index) => (
                  <div key={index}>
                    <Input label="Host" value={setting.host} />
                    <Input label="Port" value={setting.port} />
                    <Input label="User" value={setting.user} />
                    <Input label="Password" value={setting.password} />
                    <Checkbox label="secure" idForCheckBox="secure" />
                  </div>
                ))}

                <div className="d-flex flex-column" style={{ position : "absolute", right:"10px" , top:"10px"  }}>
                  <Button button="save"  />
                  <Button button="export"  />
                </div>
                {this.state.save}
                <Button button="Add" onClick={() => this.onAddSetting()} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
