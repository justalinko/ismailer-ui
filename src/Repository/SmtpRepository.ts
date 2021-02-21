import FileSaver from "file-saver";
import { SmtpSettingDto } from "../Dto/SmtpSettingDto";
export class SmtpRepository {
  static SETTING_KEY = "smtp-settings";

  static loadSavedSetting(): SmtpSettingDto[] {
    return JSON.parse(localStorage.getItem(this.SETTING_KEY) || "[]") as SmtpSettingDto[];
  }

  static saveSetting(settings: SmtpSettingDto[]) {
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

  static export(settings: SmtpSettingDto[]) {
    const blob = new Blob([JSON.stringify(settings)]);
    FileSaver.saveAs(blob, "smtp-setting.json");
  }
}
