import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

export default function AppBarCus() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar sx={{ justifyContent: "center" }}>
          <img
            src="logo.png"
            alt="Logo"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              width: "100px",
              height: "auto",
            }}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
