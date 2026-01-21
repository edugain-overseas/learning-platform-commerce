import { createSlice } from "@reduxjs/toolkit";
import {
  createInstructionThunk,
  deleteInstructionThunk,
  editInstructionThunk,
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
            ({ id }) => !payload?.find(({ id: instrId }) => instrId === id)
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
            ({ id }) => !payload?.find(({ id: instrId }) => instrId === id)
          ),
          ...payload,
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
      })

      .addCase(createInstructionThunk.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(createInstructionThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.instructions.push(payload);
      })
      .addCase(createInstructionThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = { code: payload.code, message: payload.message };
      })

      .addCase(editInstructionThunk.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(editInstructionThunk.fulfilled, (state, action) => {
        const { id } = action.meta.arg;

        state.isLoading = false;
        state.instructions = state.instructions.map((instr) =>
          instr.id === id ? action.payload : instr
        );
      })
      .addCase(editInstructionThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = { code: payload.code, message: payload.message };
      })

      .addCase(deleteInstructionThunk.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(deleteInstructionThunk.fulfilled, (state, action) => {
        const id = action.meta.arg;

        state.isLoading = false;
        state.instructions = state.instructions.filter(
          (instr) => instr.id !== id
        );
      })
      .addCase(deleteInstructionThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = { code: payload.code, message: payload.message };
      });
  },
});

export default instructionSlice;
