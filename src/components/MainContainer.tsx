import React from "react";
import Box from "@mui/material/Box";
import styles from "./style/MainContainer.module.css";
import { ImageLoader } from "./ImageLoader/ImageLoader";
import { ResultViewer } from "./ResultViewer/ResultViewer";
import { Typography } from "@mui/material";

export const MainContainer: React.FC = () => {
  return (
    <Box className={styles.container} sx={{ bgcolor: "common.white" }}>
      <Box className={styles.title}>
        <Typography  variant="h3" fontWeight="bold" color="primary" >分析結果</Typography>
      </Box>
      <Box className={styles.contents}>
        <ImageLoader />
        <ResultViewer />
      </Box>
    </Box>
  );
};
