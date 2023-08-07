import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IImageLoaderState{
    dataUrl: string | undefined
    width: number
    height: number
    imgArray: number[] | undefined
    color_num: number
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
    imgArray: undefined,
    color_num: 5
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
    setColorNum: (state: IImageLoaderState, action: PayloadAction<number>) => {
      state.color_num = action.payload;
      },
  },
});

export const { loadImg, setColorNum } = ImageLoaderSlice.actions;
export default ImageLoaderSlice.reducer;