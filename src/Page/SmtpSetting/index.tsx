import React from "react";
import { Button } from "../../Atom/Button";
import { SmtpSettingDto } from "../../Dto/SmtpSettingDto";
import { SmtpSettingCard } from "../../Molecules/SmtpSettingCard";
import { SmtpRepository } from "../../Repository/SmtpRepository";

export interface SmtpSettingPageProps {}

export interface State {
  settings: SmtpSettingDto[];
}
export class SmtpSettingPage extends React.Component<SmtpSettingPageProps, State> {
  state = {
    settings: SmtpRepository.loadSavedSetting(),
  };

  onSettingUpdated(value: SmtpSettingDto, index: number) {
    const updatedArray = this.state.settings;
    updatedArray[index] = value;
    this.setState({
      settings: updatedArray,
    });

    SmtpRepository.saveSetting(updatedArray);
  }

  onSettingRemoved(index: number) {
    this.setState((previousState) => {
      previousState.settings.splice(index, 1);
      SmtpRepository.saveSetting(previousState.settings);
      return previousState;
    });
  }

  onAddSetting() {
    this.setState((previousState) => {
      return {
        settings: [
          ...previousState.settings,
          {
            host: "",
            password: "",
            port: 0,
            user: "",
            secure: false,
          },
        ],
      };
    });
  }

  async importSetting() {
    const settingStr = await SmtpRepository.import();
    const settings = JSON.parse(settingStr);

    this.setState({
      settings,
    });

    SmtpRepository.saveSetting(settings);
  }

  exportSetting() {
    SmtpRepository.export(this.state.settings);
  }

  render() {
    return (
      <div style={{ marginLeft: "25%" }}>
        <div className="d-flex justify-content-center py-3 w3-red">
          <h1>SMTP Setting</h1>
        </div>

        <div className="row" style={{ marginBottom: "100px" }}>
          {this.state.settings.map((setting, index) => (
            <SmtpSettingCard
              onValueChange={(value) => {
                this.onSettingUpdated(value, index);
              }}
              onRemove={() => {
                this.onSettingRemoved(index);
              }}
              key={index}
              value={setting}
            />
          ))}
        </div>
        <div className="bg-white shadow-lg w-100" style={{ display: "flex", position: "fixed", bottom: "0", height: "fit-content", padding: "15px 20px", boxSizing: "border-box" }}>
          <Button button="Add" onClick={() => this.onAddSetting()} />
          {this.state.settings.length > 0 && (
            <div className="d-flex ml-4">
              <Button button="import" onClick={() => this.importSetting()} />
              <Button button="export" onClick={() => this.exportSetting()} />
            </div>
          )}
        </div>
      </div>
    );
  }
}
