import { Box, Button, IconButton } from "@mui/material";
import React, { useCallback } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useSelector } from "react-redux";
import { IState } from "../../Store";
import { IImageLoaderState, IResults } from "../../slice/ImageLoaderReducer";
import { rgb2hsv } from "../../img/color";
import { IResultViewerState } from "../../slice/ResultViewerReducer";

interface IProps {
  width: number;
}

enum ColorModes {
  rgb = 0,
  hsv = 1,
}

const toText = (results: IResults, mode: keyof typeof ColorModes = "rgb") => {
  const colors: string[] = [];
  Object.keys(results).map((key) => {
    const color = results[Number(key)].rgb;

    if (mode === "rgb") {
      colors.push(color.toString());
    } else if (mode === "hsv") {
      colors.push(rgb2hsv(color).toString());
    }
  });
  return colors.join("\n");
};

export const Footer: React.FC<IProps> = (props) => {
  const imageLoaderState = useSelector<IState, IImageLoaderState>(
    (a) => a.imageLoader
  );
  const resultViewerState = useSelector<IState, IResultViewerState>(
    (a) => a.resultViewer
  );

  const handleClickCopy = useCallback(() => {
    if (!imageLoaderState.results) {
      return;
    }
    const copyText = toText(
      imageLoaderState.results,
      resultViewerState.colorMode
    );
    navigator.clipboard.writeText(copyText);
    alert(copyText);
  }, [imageLoaderState.results, resultViewerState.colorMode]);

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}></Box>
      <Box sx={{ display: "flex" }}>
        {650 < props.width ? (
          <React.Fragment>
            <Button startIcon={<ContentCopyIcon />} onClick={handleClickCopy}>
              クリップボードにコピー
            </Button>
            <Button startIcon={<DownloadIcon />}>CSVダウンロード</Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <IconButton size="large">
              <ContentCopyIcon />
            </IconButton>
            <IconButton size="large">
              <DownloadIcon />
            </IconButton>
          </React.Fragment>
        )}
      </Box>
    </React.Fragment>
  );
};
