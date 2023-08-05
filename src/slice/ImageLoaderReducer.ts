import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IImageLoaderState{
    dataUrl: string | undefined
    width: number
    height: number
}

interface ILoadImg{
    dataUrl: string
    width: number
    height: number
}

const initialState: IImageLoaderState = {
    dataUrl: undefined,
    width: 50,
    height: 50
}


export const ImageLoaderSlice = createSlice({
  name: "imageLoader",
  initialState: initialState,
  reducers: {
    loadImg: (state: IImageLoaderState, action: PayloadAction<ILoadImg>) => {
      state.dataUrl = action.payload.dataUrl;
      state.width = action.payload.width;
      state.height = action.payload.height;
    },
    // updateBackWeek: (state: IWeekDiffState, action: PayloadAction<number>) => {
    //   state.backWeek = action.payload;
    // },
  },
});

export const { loadImg } = ImageLoaderSlice.actions;
export default ImageLoaderSlice.reducer;