import React, { useRef } from "react";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useDispatch } from "react-redux";
import { loadImg } from "../../slice/ImageLoaderReducer";
import { img2Array } from "../../img/Img";
interface IProps {
  width: number;
}

export const Footer: React.FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const onHandleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      return;
    }
    console.log(e.target.value);

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
        console.log(imgArray?.length)
        dispatch(
          loadImg({
            dataUrl: dataUrl as string,
            width: img.width,
            height: img.height,
            imgArray: imgArray ? Array.from(imgArray) : undefined
          })
        );
      };
    };
  };

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <Box>
          <TextField
            id="color-number"
            variant="standard"
            label="カラー数"
            defaultValue="5"
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex" }}>
        {650 < props.width ? (
          <React.Fragment>
            <Button startIcon={<RefreshIcon />}>再アップロード</Button>
            <label htmlFor={"icon-button-file"}>
              <input
                id={"icon-button-file"}
                type="file"
                accept="image/*"
                onChange={onHandleUpload}
                style={{ display: "none" }}
              />
              <Button startIcon={<UploadFileIcon />} component="span">
                ファイルアップロード
              </Button>
            </label>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <IconButton size="large">
              <RefreshIcon />
            </IconButton>
            <label htmlFor="icon-button-file">
              <input
                accept="image/*"
                id="icon-button-file"
                type="file"
                style={{ display: "none" }}
                onChange={onHandleUpload}
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
