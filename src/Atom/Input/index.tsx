import { Component, InputHTMLAttributes } from "react";
// import "./style.css";

export interface InputProps extends InputHTMLAttributes<HTMLElement> {
  label: string;
  value?: string;
}

export class Input extends Component<InputProps> {
  render() {
    const { label, value, ...props } = this.props;

    return (
      <div className="d-flex flex-column text-left text-input" style={{ position: "relative" }}>
        <label htmlFor="from" id="label">
          {label}
        </label>
        <input {...props} value={value} />
      </div>
    );
  }
}
