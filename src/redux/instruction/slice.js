import { createSlice } from "@reduxjs/toolkit";
import {
  getCoursesInstuctionsThunk,
  getGeneralInstuctionsThunk,
  getInstuctionByIdThunk,
} from "./operations";

const initialState = {
  isLoading: false,
  error: null,
  instructions: [],
};

const instructionSlice = createSlice({
  name: "instruction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGeneralInstuctionsThunk.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(getGeneralInstuctionsThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.instructions = [
          ...state.instructions.filter(
            ({ id }) => !payload.find(({ id: instrId }) => instrId === id)
          ),
          ...payload.map((instr) => ({ ...instr, type: "general" })),
        ];
      })
      .addCase(getGeneralInstuctionsThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = { code: payload.code, message: payload.message };
      })

      .addCase(getCoursesInstuctionsThunk.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(getCoursesInstuctionsThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.instructions = [
          ...state.instructions.filter(
            ({ id }) => !payload.find(({ id: instrId }) => instrId === id)
          ),
          ...payload.map((instr) => ({ ...instr, type: "courses" })),
        ];
      })
      .addCase(getCoursesInstuctionsThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = { code: payload.code, message: payload.message };
      })

      .addCase(getInstuctionByIdThunk.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(getInstuctionByIdThunk.fulfilled, (state, { payload }) => {
        const instructionInfo = payload[0];

        state.isLoading = false;
        state.instructions = state.instructions.map((instr) =>
          instr.id === instructionInfo.id ? instructionInfo : instr
        );
      })
      .addCase(getInstuctionByIdThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = { code: payload.code, message: payload.message };
      });
  },
});

export default instructionSlice;
