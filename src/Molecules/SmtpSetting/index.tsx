import { Input } from "../../Atom/Input";
import React from "react";
import { Checkbox } from "../../Atom/checkbox";
import { Button } from '../../Atom/Button'

export interface SmtpSettingProps {
  value: SmtpSettingValue;
  key: string;
  onValueChange(value: SmtpSettingValue): void;
}

export interface SmtpSettingValue {
  host: string;
  port: string;
  user: string;
  password: string;
  [key: string]: string;
}

interface State extends SmtpSettingValue {}

export class SmtpSetting extends React.Component<SmtpSettingProps, State> {
  state = this.props.value;
  onChange(e: React.ChangeEvent<any>) {
    const name = e.target.name;
    const value = e.target.value!;

    this.setState({
      [name]: value,
    });

    const smtpSetting = {
      ...this.state,
      [name]: value,
    } as SmtpSettingValue;

    this.props.onValueChange(smtpSetting);
  }

  render() {
    return (
      
       <div className="col-md-6 mt-4" key={this.props.key} style={{ marginRight: '0 !important' }}>
        <div className="card mx-auto" style={{ width:'90%' }}>
            <div className="card-body">
              <Input name="host" label="Host" value={this.state.host} onChange={(e) => this.onChange(e)} />
              <Input name="port" label="Port" value={this.state.port} onChange={(e) => this.onChange(e)} />
              <Input name="user" label="User" value={this.state.user} onChange={(e) => this.onChange(e)} />
              <Input name="password" label="Password" value={this.state.password} onChange={(e) => this.onChange(e)} />
              <Checkbox name="secure" label="secure" idForCheckBox="secure" onChange={(e) => this.onChange(e)} />
              <Button button="remove" style={{ background : '#fff !important' }} />
            </div>
          </div>
       </div>
      
    );
  }
}
