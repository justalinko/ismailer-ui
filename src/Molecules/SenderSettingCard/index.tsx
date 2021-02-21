import { Input } from "../../Atom/Input";
import React from "react";
import { SenderSettingDto } from "../../Dto/SenderSettingDto";

export interface SenderSettingProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  value: SenderSettingDto;
  onValueChange(value: SenderSettingDto): void;
}

export class SenderSettingCard extends React.Component<SenderSettingProps> {
  onInputChange(e: React.ChangeEvent<any>) {
    const name = e.target.name;
    const value = e.target.value!;

    const senderSetting = {
      ...this.props.value,
      [name]: value,
    } as SenderSettingDto;

    this.props.onValueChange(senderSetting);
  }

  render() {
    const { value, ...props } = this.props;

    return (
      <div {...props}>
        <Input name="fromName" label="From Name" value={value.fromName} onChange={(e) => this.onInputChange(e)} />
        <Input name="fromEmail" label="From Email" value={value.fromEmail} onChange={(e) => this.onInputChange(e)} />
        <Input name="subject" label="Subject" value={value.subject} onChange={(e) => this.onInputChange(e)} />
      </div>
    );
  }
}
