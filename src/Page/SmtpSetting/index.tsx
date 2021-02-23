import { Button } from "antd";
import React from "react";
import * as yup from "yup";
import { SmtpSettingDto } from "../../Dto/SmtpSettingDto";
import EditableTable from "../../Molecules/EditableTable";
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
    const updatedArray = [...this.state.settings];
    updatedArray[index] = {
      ...updatedArray[index],
      ...value,
    };

    this.setState({
      settings: updatedArray,
    });

    SmtpRepository.saveSetting(updatedArray);
  }

  onSettingRemoved(index: number) {
    console.log("removed", index);

    this.setState((previousState) => {
      const settings = [...previousState.settings];
      settings.splice(index, 1);
      SmtpRepository.saveSetting(settings);
      return {
        settings,
      };
    });
  }

  onAddSetting() {
    // @ts-ignore
    this.setState((previousState) => {
      const addSettings = [
        ...previousState.settings,
        {
          key: previousState.settings.length,
          host: undefined,
          password: "",
          port: 0,
          user: "",
          secure: false,
        },
      ];
      // @ts-ignore
      SmtpRepository.saveSetting(addSettings);
      return {
        settings: addSettings,
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
    console.log("rerender", this.state.settings.length);

    return (
      <div>
        <Button onClick={() => this.onAddSetting()} type="primary" style={{ marginBottom: 16 }}>
          Add a new setting
        </Button>

        <Button onClick={() => this.importSetting()} type="primary" style={{ marginBottom: 16, marginLeft: 20 }}>
          Import
        </Button>

        <Button onClick={() => this.exportSetting()} type="primary" style={{ marginBottom: 16, marginLeft: 20 }}>
          Export
        </Button>
        <EditableTable
          columns={[
            {
              dataIndex: "key",
              editable: false,
              title: "Key",
            },
            {
              dataIndex: "host",
              type: "text",
              editable: true,
              title: "Host",
              placeholder: "Input your smtp host",
              validation: yup.string().required(),
            },
            {
              dataIndex: "port",
              type: "number",
              editable: true,
              title: "Port",
              placeholder: "Input your smtp port",
              validation: yup.number().required("Required, must be a number").typeError("Must be a number"),
            },
            {
              dataIndex: "secure",
              type: "checkbox",
              editable: true,
              title: "Secure",
              validation: yup.boolean().required(),
            },
            {
              dataIndex: "user",
              type: "text",
              editable: true,
              title: "User",
              placeholder: "Input your user",
              validation: yup.string().min(1),
            },
            {
              dataIndex: "password",
              type: "text",
              editable: true,
              title: "password",
              placeholder: "Input your password",
              validation: yup.string().required(),
            },
          ]}
          datasource={this.state.settings}
          onRowChanged={(row, key) => this.onSettingUpdated(row, key as number)}
          onRowDeleted={(row, key) => this.onSettingRemoved(key as number)}
        />
      </div>
    );
  }
}
