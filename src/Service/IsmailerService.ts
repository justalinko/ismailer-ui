import { http } from "../Common/http";

export class IsmailerService {
  static async sendMail(settings: SmtpSetting[], messages: EmailMessage[]): Promise<void> {
    await http.post("/ismailer/send", {
      settings,
      messages,
    });
  }

  static getSmtpSettings(): SmtpSetting[] {
    const strSetting = localStorage.getItem("settings");
    const settings: SmtpSetting[] = strSetting ? JSON.parse(strSetting) : [];
    return settings;
  }

  static setSmtpSettings(settings: SmtpSetting[]) {
    localStorage.setItem("settings", JSON.stringify(settings));
  }
}

export interface SmtpSetting {
  host: string;
  port: number;
  user: string;
  password: string;
  secure?: false;
}

export interface EmailMessage {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}
