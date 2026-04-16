import axios from "axios";
import { serverBaseUrl } from "./server";
import { docParserDomain } from "./documentParserServer";

export const instance = axios.create({
  baseURL: serverBaseUrl,
  // headers: {
  //   "ngrok-skip-browser-warning": "1",
  // },
});

export const docParserInstance = axios.create({
  baseURL: docParserDomain,
  headers: {
    "ngrok-skip-browser-warning": "1",
  },
});
