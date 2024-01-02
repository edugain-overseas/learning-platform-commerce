import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  surname: "",
  nickname: "",
  email: "",
  phone: "",
  country: "",
  accessToken: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserFromGoogleAPI(state, {payload}) {
    },
  },
});

export default userSlice;
