import React from "react";
import { Button } from "../../Atom/Button";
import { Checkbox } from "../../Atom/Checkbox";
import { Input } from "../../Atom/Input";
import { SmtpSettingDto } from "../../Dto/SmtpSettingDto";

export interface SmtpSettingProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  value: SmtpSettingDto;
  onValueChange(value: SmtpSettingDto): void;
  onRemove(): void;
}
export class SmtpSettingCard extends React.Component<SmtpSettingProps> {
  onInputChange(e: React.ChangeEvent<any>, isNumber: boolean = false) {
    const name = e.target.name;
    const value = e.target.value!;

    const smtpSetting = {
      ...this.props.value,
      [name]: isNumber ? parseInt(value) : value,
    } as SmtpSettingDto;

    this.props.onValueChange(smtpSetting);
  }

  render() {
    const { value, onValueChange, ...props } = this.props;
    return (
      <div className="col-md-6 mt-4" style={{ marginRight: "0 !important" }} {...props}>
        <div className="card mx-auto" style={{ width: "90%" }}>
          <div className="card-body">
            <Input name="host" label="Host" value={value.host} onChange={(e) => this.onInputChange(e)} />
            <Input name="port" label="Port" value={value.port.toString()} onChange={(e) => this.onInputChange(e)} />
            <Input name="user" label="User" value={value.user} onChange={(e) => this.onInputChange(e)} />
            <Input name="password" label="Password" value={value.password} onChange={(e) => this.onInputChange(e)} />
            <Checkbox
              name="secure"
              label="secure"
              idForCheckBox="secure"
              checked={value.secure}
              onChange={(e) =>
                this.props.onValueChange({
                  ...value,
                  secure: !value.secure,
                })
              }
            />
            <Button button="remove" style={{ background: "#fff !important" }} onClick={() => props.onRemove()} />
          </div>
        </div>
      </div>
    );
  }
}
