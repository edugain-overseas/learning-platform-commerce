import axios from "axios";
import { serverBaseUrl } from "./sever";

export const instance = axios.create({
  baseURL: serverBaseUrl,
  headers: {
    "ngrok-skip-browser-warning": "1",
  },
});
