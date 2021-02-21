import { Card } from "../../Molecules/Card";
import React from "react";
import { Button } from "../../Atom/Button";

export interface SenderSettingPageProps {}

interface State {
  settings: number;
}

export class SenderSettingPage extends React.Component<SenderSettingPageProps, State> {
  render() {
    return (
      <div style={{ marginLeft: "25%" }}>
        <div className="w3-container text-center py-3 w3-red">
          <h1>isMailer</h1>
        </div>
        <div className="row">
          <div className="col-md-5">
            <div className="ml-3 mt-3">
              <div className="card" style={{ position: "relative" }}>
                <div className="card-body text-left">
                  <Card />
                  <Button button="Save" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
