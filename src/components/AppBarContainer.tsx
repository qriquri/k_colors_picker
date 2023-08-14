import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { IconButton, Toolbar, Typography } from "@mui/material";
// import logo from "../logo.svg";

export const AppBarContainer: React.FC = () => {
  return (
      <AppBar position="sticky" color="primary">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ height: "56px" }}
          >
            <img
              src={logo}
              className="App-logo"
              alt="logo"
              style={{ height: "100%" }}
            />
          </IconButton> */}
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            K Colors Picker
          </Typography>
        </Toolbar>
      </AppBar>
  );
};
