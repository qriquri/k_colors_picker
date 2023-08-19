import React, { useRef } from "react";
import { Box, Typography } from "@mui/material";
import styles from "../style/MainContents.module.css";
import { useComponentSize } from "../Hooks/componentSize";
import { Footer } from "./Footer";
import { Main } from "./Main";

export const ImageLoader: React.FC = () => {
  const elm = useRef<HTMLElement>(null);
  const main = useRef<HTMLElement>(null);
  const [eWidth, eHeight] = useComponentSize(elm);
  const [mWidth, mHeight] = useComponentSize(main);

  return (
    <Box className={styles.container} ref={elm}>
      <Box className={styles.contentsWrapper} sx={{ bgcolor: "grey.200" }}>
        <Box className={styles.contents}>
          <Box className={styles.title}>
            <Typography variant="h4" fontWeight="bold" color="primary">
              画像
            </Typography>
          </Box>
          <Box className={styles.main} ref={main}>
            <Main mHeight={mHeight * 0.9} mWidth={mWidth * 0.9} />
          </Box>
          <Box className={styles.footer}>
            <Footer width={eWidth} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
