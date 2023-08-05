import React from "react";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import styles from "./style/AppContainer.module.css";
import { MainContainer } from "./MainContainer";
import { AppBarContainer } from "./AppBarContainer";

export const AppContainer: React.FC = () => {
  const theme = createTheme({
    typography: {
      // In Chinese and Japanese the characters are usually larger,
      // so a smaller fontsize may be appropriate.
      fontSize: (14 * 100) / 62.5,
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Box className={styles.container}>
        <AppBarContainer />
        <MainContainer />
      </Box>
    </ThemeProvider>
  );
};
