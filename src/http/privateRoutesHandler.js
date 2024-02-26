import { instance } from "./instance";
import { refreshToken } from "./services/user";
import { refreshTokenAction } from "../redux/user/slice";

export const privateRoutesHandler = async (method, url, ...args) => {
  try {
    const { data } = await instance[method](url, ...args);
    return data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      try {
        const newTokenData = await refreshToken();
        refreshTokenAction(newTokenData);

        const {data} = await instance[method](url, ...args);
        return data;
      } catch (refreshError) {
        throw refreshError;
      }
    }
    throw error;
  }
};
