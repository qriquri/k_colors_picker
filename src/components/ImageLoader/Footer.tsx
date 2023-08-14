import React from "react";
import { Box, Button, IconButton, TextField } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useDispatch } from "react-redux";
import {
  IImageLoaderState,
  getColors,
  loadImg,
  setColorNum,
} from "../../slice/ImageLoaderReducer";
import * as ImageLoaderReducer from "../../slice/ImageLoaderReducer";
import { getNormalizedSize, img2Array } from "../../img/Img";
import { useSelector } from "react-redux";
import { IState, store } from "../../Store";
import { isNumber } from "../../utils/number";

interface IProps {
  width: number;
}

const sendAndGetColors = () => {
  const state = store.getState().imageLoader;
  if (state.imgArray) {
    const size = getNormalizedSize(state.size, 256);

    store.dispatch(
      getColors({
        imgArray: state.imgArray,
        size: size,
        colorNum: state.colorNum,
      }) as any
    );
  }
};

export const Footer: React.FC<IProps> = (props) => {
  const imageLoaderState = useSelector<IState, IImageLoaderState>(
    (a) => a.imageLoader
  );
  const dispatch = useDispatch();

  const handleColorNumChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!isNumber(e.target.value)) {
      return;
    }
    dispatch(setColorNum(Number(e.target.value)));
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files as FileList; // fileの取得
      const reader = new FileReader();

      reader.readAsDataURL(file[0]); // fileの要素をdataURL形式で読み込む

      // ファイルを読み込んだ時に実行する
      reader.onload = function () {
        const dataUrl = reader.result; // 読み込んだファイルURL
        const img = new Image(); // 画像

        img.src = dataUrl as string;
        // 画像の読み込みに成功したとき
        img.onload = function () {
          const imgArray = img2Array(img);
          console.log(imgArray?.length);
          dispatch(
            loadImg({
              dataUrl: dataUrl as string,
              size: { width: img.width, height: img.height },
              imgArray: imgArray ? Array.from(imgArray) : undefined,
            })
          );
          sendAndGetColors();
        };
      };
    } catch (error) {
      console.error(error);
    }
  };

  const onClickReFlesh = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if(imageLoaderState.dataUrl === ImageLoaderReducer.initialState.dataUrl){
      alert('先ずは自分の画像をアップロードしてください。')
      return
    }
    console.log("reFlesh");
    sendAndGetColors();
  };

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <Box>
          <TextField
            id="color-number"
            variant="standard"
            label="カラー数"
            defaultValue={imageLoaderState.colorNum.toString()}
            value={imageLoaderState.colorNum.toString()}
            onChange={handleColorNumChange}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex" }}>
        {650 < props.width ? (
          <React.Fragment>
            <Button startIcon={<RefreshIcon />} onClick={onClickReFlesh}>
              再アップロード
            </Button>
            <label htmlFor={"icon-button-file"}>
              <input
                id={"icon-button-file"}
                type="file"
                accept="image/*"
                onChange={handleUpload}
                style={{ display: "none" }}
              />
              <Button startIcon={<UploadFileIcon />} component="span">
                ファイルアップロード
              </Button>
            </label>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <IconButton size="large" onClick={onClickReFlesh}>
              <RefreshIcon />
            </IconButton>
            <label htmlFor="icon-button-file">
              <input
                accept="image/*"
                id="icon-button-file"
                type="file"
                style={{ display: "none" }}
                onChange={handleUpload}
              />
              <IconButton size="large" component="span">
                <UploadFileIcon />
              </IconButton>
            </label>
          </React.Fragment>
        )}
      </Box>
    </React.Fragment>
  );
};
