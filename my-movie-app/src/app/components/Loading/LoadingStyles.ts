
import { SxProps, Theme } from "@mui/material";

export const backdropStyles: SxProps<Theme> = {
  color: "#fff",
  zIndex: (theme) => theme.zIndex.drawer + 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};
