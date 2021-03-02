import { Button } from "antd";
import React from "react";
import * as yup from "yup";
import { SmtpSettingDto } from "../../Dto/SmtpSettingDto";
import EditableTable from "../../Molecules/EditableTable";
import { SmtpRepository } from "../../Repository/SmtpRepository";

export interface SmtpSettingPageProps {}
export interface State {
  settings: SmtpSettingDto[];
  selectedRowKeys: React.Key[];
}
export class SmtpSettingPage extends React.Component<SmtpSettingPageProps, State> {
  state = {
    settings: SmtpRepository.loadSavedSetting(),
    selectedRowKeys: [],
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

  removeSelectedSettings() {
    this.setState((previousState) => {
      const settings = [...previousState.settings];

      const indices = this.state.selectedRowKeys;

      for (const index of indices) {
        settings.splice(index, 1);
      }
      SmtpRepository.saveSetting(settings);
      return {
        settings,
        selectedRowKeys: [],
      };
    });
  }

  onAddSetting() {
    this.setState((previousState) => {
      const addSettings = [
        ...previousState.settings,
        {
          host: "",
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
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: (selectedRowKeys: React.Key[]) => this.setState({ selectedRowKeys }),
    };

    console.log(this.state.selectedRowKeys);

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

        <Button disabled={this.state.selectedRowKeys.length < 1} onClick={() => this.removeSelectedSettings()} type="primary" style={{ marginBottom: 16, marginLeft: 20 }}>
          Delete
        </Button>

        <EditableTable
          rowSelection={rowSelection}
          columns={[
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
          onRowChanged={(row, index) => this.onSettingUpdated(row, index)}
        />
      </div>
    );
  }
}
