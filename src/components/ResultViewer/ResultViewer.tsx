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


const ColorModes = { "0": "RGB", "1": "HSV" };

export const ResultViewer: React.FC = () => {
  const elm = useRef<HTMLElement>(null);
  const [width, height] = useComponentSize(elm);
  const [colorMode, updateColorMode] = useState("0");
  const handleColorModeChange = (e: SelectChangeEvent) => {
    const value = e.target.value as keyof typeof ColorModes;
    updateColorMode(value);
  };

  return (
    <Box className={styles.container} ref={elm}>
      <Box className={styles.contentsWrapper} sx={{ bgcolor: "grey.200" }}>
        <Box className={styles.contents}>
          <Box className={styles.title}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" fontWeight="bold" color="primary">
                カラー
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <FormControl fullWidth>
                <InputLabel id="color-mode-select-label">カラー</InputLabel>
                <Select
                  labelId="color-mode-select-label"
                  id="color-mode-select"
                  value={colorMode}
                  label="カラーモード"
                  onChange={handleColorModeChange}
                >
                  {Object.keys(ColorModes).map((key) => {
                    return (
                      <MenuItem value={key} key={key}>
                        {ColorModes[key as keyof typeof ColorModes]}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
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
