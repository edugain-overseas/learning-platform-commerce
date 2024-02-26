import { instance } from "./instance";
import { refreshToken } from "./services/user";
import { store } from "../redux/store";
import { refreshTokenAction } from "../redux/user/slice";

export const privateRoutesHandler = async (method, url, ...args) => {
  try {
    const { data } = await instance[method](url, ...args);
    return data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      try {
        const newTokenData = await refreshToken();
        store.dispatch(refreshTokenAction(newTokenData));
        instance.defaults.headers[
          "Authorization"
        ] = `Bearer ${newTokenData.access_token}`;
        
        const { data } = await instance[method](url, ...args);
        return data;
      } catch (refreshError) {
        throw refreshError;
      }
    }
    throw error;
  }
};
