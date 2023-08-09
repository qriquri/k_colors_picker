import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { postColors } from "../api/Api";

export interface IResults {
  [prop: number]: { rgb: number[]; count: number };
}

export const ColorModes = { rgb: 0, hsv: 1 };
export type ColorMode = keyof typeof ColorModes

export interface IResultViewerState {
  colorMode: ColorMode;
}


const initialState: IResultViewerState = {
  colorMode: "rgb"
};

export const ResultViewerSlice = createSlice({
  name: "resultViewer",
  initialState: initialState,
  reducers: {
    setColorMode: (state: IResultViewerState, action: PayloadAction<ColorMode>) => {
      state.colorMode = action.payload;
    },
  }
});

export const { setColorMode } = ResultViewerSlice.actions;
export default ResultViewerSlice.reducer;
