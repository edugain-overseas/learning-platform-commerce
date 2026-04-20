import axios from "axios";
import { docParserBaseUrl, serverBaseUrl } from "./server";

export const instance = axios.create({
  baseURL: serverBaseUrl,
  // headers: {
  //   "ngrok-skip-browser-warning": "1",
  // },
});

export const docParserInstance = axios.create({
  baseURL: docParserBaseUrl,
  // headers: {
  //   "ngrok-skip-browser-warning": "1",
  // },
});
