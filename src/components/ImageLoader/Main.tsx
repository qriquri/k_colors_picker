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
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2008px-Google_%22G%22_Logo.svg.png";
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
          alt="google logo"
          width={displaySize.width}
          height={displaySize.height}
          style={{}}
        />
      )}
    </React.Fragment>
  );
};
