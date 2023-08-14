import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { IState } from "../../Store";
import { IImageLoaderState } from "../../slice/ImageLoaderReducer";
import { getNormalizedSize } from "../../img/Img";
import { CircularProgress } from "@mui/material";

interface IProps {
  mWidth: number;
  mHeight: number;
}

export const Main: React.FC<IProps> = ({ mWidth, mHeight }) => {
  const imageLoaderState = useSelector<IState, IImageLoaderState>(
    (a) => a.imageLoader
  );

  const imgUrl = useMemo(() => {
    if (!imageLoaderState.dataUrl) {
      return "https://pixabay.com/get/gc9bd0544dc56a5a02f2875d8c34fca0b9b0bbb737caa5e5bcff3f9e59e1784226d0bf7393cd900482fdbf26784c2052c4593d271ed8025d70dc0beeee2b3ffc2_1280.jpg";
    }
    return imageLoaderState.dataUrl;
  }, [imageLoaderState.dataUrl]);

  const displaySize = useMemo(() => {
    const originalSize = imageLoaderState.size;
    if (mWidth < mHeight) {
      return getNormalizedSize(originalSize, mWidth);
    } else {
      return getNormalizedSize(originalSize, mHeight);
    }
  }, [imageLoaderState.size, mHeight, mWidth]);

  return (
    <React.Fragment>
      {imageLoaderState.loading ? (
        <CircularProgress />
      ) : (
        <img
          src={imgUrl}
          alt="you submit"
          width={displaySize.width}
          height={displaySize.height}
          style={{}}
        />
      )}
    </React.Fragment>
  );
};
