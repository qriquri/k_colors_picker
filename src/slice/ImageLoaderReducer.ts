import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { postColors } from "../api/Api";
import { min } from "../utils/number";

export interface IResults {
  [prop: number]: { rgb: number[]; count: number };
}

export interface IImageLoaderState {
  dataUrl: string | undefined;
  size: { width: number; height: number };
  imgArray: number[] | undefined;
  colorNum: number;
  loading: boolean;
  results: IResults | undefined;
}

interface ILoadImg {
  dataUrl: string;
  size: { width: number; height: number };
  imgArray: number[] | undefined;
}

const initialState: IImageLoaderState = {
  dataUrl: undefined,
  size: { width: 50, height: 50 },
  imgArray: undefined,
  colorNum: 5,
  loading: false,
  results: undefined,
};

export const ImageLoaderSlice = createSlice({
  name: "imageLoader",
  initialState: initialState,
  reducers: {
    loadImg: (state: IImageLoaderState, action: PayloadAction<ILoadImg>) => {
      state.dataUrl = action.payload.dataUrl;
      state.size = action.payload.size;
      state.imgArray = action.payload.imgArray;
    },
    setColorNum: (state: IImageLoaderState, action: PayloadAction<number>) => {
      if (action.payload <= 0) {
        return;
      }
      state.colorNum = min([action.payload, 8]);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getColors.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getColors.fulfilled, (state, action) => {
      state.loading = false;
      state.results = action.payload.results;
    });
    builder.addCase(getColors.rejected, (state, action) => {
      state.loading = true;
      console.error("weekHabitFetch rejected");
    });
  },
});

export const getColors = createAsyncThunk(
  "getColors",
  async (payload: {
    imgArray: number[];
    size: { width: number; height: number };
    colorNum: number;
  }) => {
    const res = await postColors(payload);
    console.log(res);
    return {
      results: res ? res.results : undefined,
    };
  }
);

export const { loadImg, setColorNum } = ImageLoaderSlice.actions;
export default ImageLoaderSlice.reducer;
