import { Input } from "../../Atom/Input";
import React from "react";

class Card extends React.Component {
  render() {
    return (
      <div>
        <Input label="From Name" />
        <Input label="From Email" />
        <Input label="Subject" />
      </div>
    );
  }
}

export { Card };
