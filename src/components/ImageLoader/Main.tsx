import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { IState } from "../../Store";
import { IImageLoaderState } from "../../slice/ImageLoaderReducer";
import { getNormalizedSize } from "../../img/Img";

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
    const originalSize = {
      width: imageLoaderState.width,
      height: imageLoaderState.height,
    };
    if (mWidth < mHeight) {
      return getNormalizedSize(originalSize, mWidth);
    } else {
      return getNormalizedSize(originalSize, mHeight);
    }
  }, [imageLoaderState.height, imageLoaderState.width, mHeight, mWidth]);

  return (
    <img
      src={imgUrl}
      alt="google logo"
      width={displaySize.width}
      height={displaySize.height}
      style={{}}
    />
  );
};
