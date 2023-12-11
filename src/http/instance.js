import axios from "axios";
import { baseURL } from "./sever";

const instance = axios.create({
  baseURL,
});

export default instance;
