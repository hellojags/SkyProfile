// import React from 'react'
import { createMuiTheme } from "@material-ui/core/styles";

export const skappTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#1DBF73",
      contrastText: "white",
    },
  },
  typography: {
    htmlFontSize: 16,
    fontFamily: "'Nunito', sans-serif",
    body1: {
      lineHeight: "1.25",
    },
  },
});
