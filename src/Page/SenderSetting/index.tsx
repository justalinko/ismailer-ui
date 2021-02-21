import { SenderSettingCard } from "../../Molecules/SenderSettingCard";
import React from "react";
import { Button } from "../../Atom/Button";
import { SenderSettingDto } from "../../Dto/SenderSettingDto";
import { SenderRepository } from "../../Repository/SenderRepository";

export interface SenderSettingPageProps {}

interface State {
  setting: SenderSettingDto;
}

export class SenderSettingPage extends React.Component<SenderSettingPageProps, State> {
  state = {
    setting: SenderRepository.loadSavedSetting(),
  };

  onSave() {
    SenderRepository.saveSetting(this.state.setting);
  }

  render() {
    return (
      <div style={{ marginLeft: "25%" }}>
        <div className="w3-container text-center py-3 w3-red">
          <h1>Sender Setting</h1>
        </div>
        <div className="row">
          <div className="col-md-5">
            <div className="ml-3 mt-3">
              <div className="card" style={{ position: "relative" }}>
                <div className="card-body text-left">
                  <SenderSettingCard value={this.state.setting} onValueChange={(setting) => this.setState({ setting })} />
                  <Button button="Save" onClick={() => this.onSave()} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
