import "./style.css";
import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  button?: string;
}
export class Button extends React.Component<ButtonProps> {
  render(){
  const { button ,  ...props } = this.props
  return (
    <div className="text-left">
      <button className="button" {...props}>
        {button}
      </button>
    </div>
  );
  }
};


