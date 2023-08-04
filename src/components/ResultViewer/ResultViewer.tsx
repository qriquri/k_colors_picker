import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import styles from "../style/MainContents.module.css";
import { useComponentSize } from "../Hooks/UseComponentSize";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: "y" as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right" as const,
    },
    title: {
      display: false,
      text: "",
    },
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const labels = ["Colors"];

export const data = {
  labels,
  datasets: [
    {
      label: "rgb(234,67,54)",
      data: labels.map(() => 40),
      borderColor: "rgb(234,67,54)",
      backgroundColor: "rgba(234,67,54)",
    },
    {
      label: "rgb(51,168,83)",
      data: labels.map(() => 30),
      borderColor: "rgb(51,168,83)",
      backgroundColor: "rgba(51,168,83)",
    },
    {
      label: "rgb(66,132,244)",
      data: labels.map(() => 15),
      borderColor: "rgb(66,132,244)",
      backgroundColor: "rgba(66,132,244)",
    },
    {
      label: "rgb(250,189,5)",
      data: labels.map(() => 10),
      borderColor: "rgb(250,189,5)",
      backgroundColor: "rgba(250,189,5)",
    },
    {
      label: "rgb(255,255,255)",
      data: labels.map(() => 5),
      borderColor: "rgb(255, 255, 255)",
      backgroundColor: "rgba(255, 255, 255)",
    }
  ],
};

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
      <Box className={styles.contents} sx={{ bgcolor: "grey.200" }}>
        <Box className={styles.title}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" fontWeight="bold" color="primary">
              カラーテーマ
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
          <Bar options={options} data={data} />
        </Box>
        <Box className={styles.footer}>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Box sx={{display: 'flex'}}>
            {elm.current && 650 < width ? (
              <React.Fragment>
                <Button startIcon={<ContentCopyIcon />}>クリップボードにコピー</Button>
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
        </Box>
      </Box>
    </Box>
  );
};
