export interface SenderSettingDto {
  fromName: string;
  fromEmail: string;
  subject: string;
  [key: string]: string;
}
