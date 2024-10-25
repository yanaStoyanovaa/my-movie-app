// components/SearchStyles.ts

import { SxProps, Theme } from "@mui/material";

export const containerStyles: SxProps<Theme> = {};

export const formBoxStyles: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  mb: 4,
};

export const textFieldStyles: SxProps<Theme> = {
  borderRadius: "50px",
  height: "50px",
};

export const buttonStyles: SxProps<Theme> = {
  ml: 2,
  height: "50px",
  borderRadius: "50px",
};

export const errorBoxStyles: SxProps<Theme> = {
  color: "error.main",
};
