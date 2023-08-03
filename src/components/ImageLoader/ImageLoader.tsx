import React, { useRef } from "react";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import styles from "../style/MainContents.module.css";
import { useComponentSize } from "../Hooks/UseComponentSize";

export const ImageLoader: React.FC = () => {
  const elm = useRef<HTMLElement>(null);
  const [width, height] = useComponentSize(elm)
  
  return (
    <Box className={styles.container} ref={elm}>
      <Box className={styles.contents} sx={{ bgcolor: "grey.200" }}>
        <Box className={styles.title}>
          <Typography variant="h4" fontWeight="bold" color="primary">
            画像
          </Typography>
        </Box>
        <Box className={styles.main}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2008px-Google_%22G%22_Logo.svg.png"
            alt="google logo"
            height={"250"}
          />
        </Box>
        <Box className={styles.footer}>
          <Box sx={{ flexGrow: 1 }}>
            <TextField id="color-number" label="カラー数" defaultValue="5" />
          </Box>
          <Box>
            {elm.current && 650 < width ? (
              <React.Fragment>
                <Button startIcon={<RefreshIcon />}>再アップロード</Button>
                <Button startIcon={<UploadFileIcon />}>ファイルアップロード</Button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <IconButton size="large">
                  <RefreshIcon />
                </IconButton>
                <IconButton size="large">
                  <UploadFileIcon />
                </IconButton>
              </React.Fragment>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
