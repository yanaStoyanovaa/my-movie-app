
import { SxProps, Theme } from "@mui/material";

export const boxStyles: SxProps<Theme> = {
  marginBottom: "30px !important",
  width: {
    xs: "100%",
    sm: "50%",
    md: "50%",
    lg: "33.33%",
  },
};

export const cardStyles: SxProps<Theme> = {
  p: 2,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

export const cardMediaStyles: SxProps<Theme> = {
  borderRadius: "8px",
};

export const titleStyles: SxProps<Theme> = {
  height: "4rem",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

export const tooltipBoxStyles: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  marginTop: 1,
};

export const votesTextStyles: SxProps<Theme> = {
  mt: 1,
};

export const overviewBoxStyles: SxProps<Theme> = {
  position: "relative",
  display: "flex",
  alignItems: "center",
};

export const overviewTextStyles: SxProps<Theme> = {
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  height: "75px",
  flexGrow: 1,
};

export const iconButtonStyles: SxProps<Theme> = {
  ml: 1,
  alignSelf: "flex-end",
};
