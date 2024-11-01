import { SxProps, Theme } from "@mui/material";

export const searchHeadingStyles: SxProps<Theme> = {
  fontSize: "2.5rem",
  color: "#333",
  marginBottom: "20px",
  fontWeight: 500,
};

export const formBoxStyles: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  gap: "5px",
  alignItems: "center",
};

export const textFieldStyles: SxProps<Theme> = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: "20px 0 0 20px",
    },
  },
};

export const buttonStyles: SxProps<Theme> = {
  height: "55px",
  borderRadius: "0 20px 20px 0",
};

export const errorBoxStyles: SxProps<Theme> = {
  color: "error.main",
  marginTop: "10px",
};

export const resultsContainerStyles: SxProps<Theme> = {};

export const paginationBoxStyles: SxProps<Theme> = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "16px",
  flexWrap: "wrap",
  "@media (max-width: 800px)": {
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
  },
};
