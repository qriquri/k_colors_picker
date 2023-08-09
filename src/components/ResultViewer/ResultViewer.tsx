import React, { useRef, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import styles from "../style/MainContents.module.css";
import { useComponentSize } from "../Hooks/UseComponentSize";
import { Footer } from "./Footer";
import { Main } from "./Main";
import { ColorMode, ColorModes } from "../../slice/ResultViewerReducer";
import { Title } from "./Title";

export const ResultViewer: React.FC = () => {
  const elm = useRef<HTMLElement>(null);
  const [width, height] = useComponentSize(elm);

  return (
    <Box className={styles.container} ref={elm}>
      <Box className={styles.contentsWrapper} sx={{ bgcolor: "grey.200" }}>
        <Box className={styles.contents}>
          <Box className={styles.title}>
            <Title />
          </Box>
          <Box className={styles.main}>
            <Main />
          </Box>
          <Box className={styles.footer}>
            <Footer width={width}/>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
