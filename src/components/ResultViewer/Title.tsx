import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";
import {
  ColorMode,
  ColorModes,
  IResultViewerState,
  setColorMode,
} from "../../slice/ResultViewerReducer";
import { useSelector } from "react-redux";
import { IState } from "../../Store";
import { useDispatch } from "react-redux";

export const Title: React.FC = () => {
  const resultViewerState = useSelector<IState, IResultViewerState>(
    (a) => a.resultViewer
  );
  const dispatch = useDispatch();
  const handleColorModeChange = (e: SelectChangeEvent) => {
    const value = e.target.value as ColorMode;
    dispatch(setColorMode(value));
  };
  
  return (
    <React.Fragment>
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
            value={resultViewerState.colorMode}
            label="カラーモード"
            onChange={handleColorModeChange}
          >
            {Object.keys(ColorModes).map((key) => {
              return (
                <MenuItem value={key} key={key}>
                  {key}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    </React.Fragment>
  );
};
