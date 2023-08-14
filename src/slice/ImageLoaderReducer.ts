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

export const initialState: IImageLoaderState = {
  dataUrl:
    "https://pixabay.com/get/gc9bd0544dc56a5a02f2875d8c34fca0b9b0bbb737caa5e5bcff3f9e59e1784226d0bf7393cd900482fdbf26784c2052c4593d271ed8025d70dc0beeee2b3ffc2_1280.jpg",
  size: { width: 1280, height: 853 },
  imgArray: undefined,
  colorNum: 5,
  loading: false,
  results: {
    0: { rgb: [37, 107, 167], count: 22 },
    1: { rgb: [84,154,209], count: 22 },
    2: { rgb: [17,40,57], count: 20 },
    3: { rgb: [160,203,232], count: 20 },
    4: { rgb: [117,90,41], count: 16 },
  },
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
