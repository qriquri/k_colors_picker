import {
  combineReducers,
  configureStore,
  PreloadedState,
} from "@reduxjs/toolkit";
import {
  useSelector as rawUseSelector,
  TypedUseSelectorHook,
} from "react-redux";
import ImageLoaderReducer, { IImageLoaderState } from "./slice/ImageLoaderReducer";

export interface IState {
  imageLoader: IImageLoaderState;
}

const rootReducer = combineReducers<IState>({
  imageLoader: ImageLoaderReducer,
});

/**
 * テストでは個別にストアを作りたいので
 * @param preloadedState
 * @returns
 */
export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore<IState>({
    reducer: {
      imageLoader: ImageLoaderReducer,
    },
  });
};

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type Store = ReturnType<typeof setupStore>;
export type Dispatch = Store["dispatch"];
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
