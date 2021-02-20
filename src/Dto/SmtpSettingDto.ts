export interface SmtpSettingDto {
  host: string;
  port: number;
  user: string;
  password: string;
  secure: boolean;
  [key: string]: any;
}
