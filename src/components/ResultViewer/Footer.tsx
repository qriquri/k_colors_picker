import { Box, Button, IconButton } from "@mui/material";
import React from "react";
import DownloadIcon from "@mui/icons-material/Download";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

interface IProps {
  width: number;
}

export const Footer: React.FC<IProps> = (props) => {
  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}></Box>
      <Box sx={{ display: "flex" }}>
        {650 < props.width ? (
          <React.Fragment>
            <Button startIcon={<ContentCopyIcon />}>
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
