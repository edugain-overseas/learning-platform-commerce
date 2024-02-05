import { createSlice } from "@reduxjs/toolkit";
import { createUserThunk } from "./operations";

const initialState = {
  name: "",
  surname: "",
  username: "",
  email: "",
  phone: "",
  country: "",
  accessToken: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserFromGoogleAPI(state, { payload }) {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createUserThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        // state.username = payload.username;
      })
      .addCase(createUserThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = { code: payload.code, message: payload.message };
      });
  },
});

export default userSlice;
