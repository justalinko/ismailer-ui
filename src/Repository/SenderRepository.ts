import FileSaver from "file-saver";
import { SenderSettingDto } from "../Dto/SenderSettingDto";
export class SenderRepository {
  static SETTING_KEY = "sender-settings";

  static loadSavedSetting(): SenderSettingDto {
    const setting = localStorage.getItem(this.SETTING_KEY);
    if (setting) {
      return JSON.parse(setting) as SenderSettingDto;
    } else {
      return {
        fromEmail: "",
        fromName: "",
        subject: "",
      };
    }
  }

  static saveSetting(settings: SenderSettingDto) {
    localStorage.setItem(this.SETTING_KEY, JSON.stringify(settings));
  }

  static import(): Promise<string> {
    return new Promise((resolve, reject) => {
      const inputElement = document.createElement("input");
      inputElement.type = "file";
      inputElement.onchange = (e) => {
        e.preventDefault();
        const reader = new FileReader();
        reader.onload = async (e) => {
          const text: string = e.target!.result as string;
          resolve(text);
        };
        // @ts-ignore
        reader.readAsText(e.target!.files[0]);
      };

      inputElement.click();
    });
  }

  static export(settings: SenderSettingDto) {
    const blob = new Blob([JSON.stringify(settings)]);
    FileSaver.saveAs(blob, "sender-setting.json");
  }
}
