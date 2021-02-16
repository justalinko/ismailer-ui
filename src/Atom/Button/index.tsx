import "./style.css";
import React from "react";

const Button = ({ button, ...props }: ButtonProps) => {
  return (
    <div className="text-left">
      <button className="button" {...props}>
        {props.children}
      </button>
    </div>
  );
};

export { Button };

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  button?: string;
}
