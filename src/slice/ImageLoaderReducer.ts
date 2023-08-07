import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IImageLoaderState{
    dataUrl: string | undefined
    width: number
    height: number
    imgArray: number[] | undefined
}

interface ILoadImg{
    dataUrl: string
    width: number
    height: number
    imgArray: number[] | undefined
}

const initialState: IImageLoaderState = {
    dataUrl: undefined,
    width: 50,
    height: 50,
    imgArray: undefined
}


export const ImageLoaderSlice = createSlice({
  name: "imageLoader",
  initialState: initialState,
  reducers: {
    loadImg: (state: IImageLoaderState, action: PayloadAction<ILoadImg>) => {
      state.dataUrl = action.payload.dataUrl;
      state.width = action.payload.width;
      state.height = action.payload.height;
      state.imgArray = action.payload.imgArray;
    },
    // updateBackWeek: (state: IWeekDiffState, action: PayloadAction<number>) => {
    //   state.backWeek = action.payload;
    // },
  },
});

export const { loadImg } = ImageLoaderSlice.actions;
export default ImageLoaderSlice.reducer;