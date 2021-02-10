import Axios from "axios";

export const http = Axios.create({
  baseURL: process.env.ISMAILER_BASE_URL,
});
