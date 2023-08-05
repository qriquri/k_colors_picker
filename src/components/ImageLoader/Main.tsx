import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { IState } from "../../Store";
import { IImageLoaderState } from "../../slice/ImageLoaderReducer";

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
    let width =
      imageLoaderState.width >= imageLoaderState.height
        ? mWidth
        : (mHeight * imageLoaderState.width) / imageLoaderState.height;
    let height =
      imageLoaderState.width >= imageLoaderState.height
        ? (mWidth * imageLoaderState.height) / imageLoaderState.width
        : mHeight;

    // はみだし防止
    if (width < height) {
      if (mWidth < width) {
        width *= mWidth / width;
        height *= mWidth / width;
      } else if (width > height) {
        if (mHeight < height) {
          width *= mHeight / height;
          height *= mHeight / height;
        }
      }
    } else {
      if (mHeight < height) {
        width *= mHeight / height;
        height *= mHeight / height;
      }
    }
    return {
      width: width,
      height: height,
    };
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
