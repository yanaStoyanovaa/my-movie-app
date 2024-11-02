
import { SxProps, Theme } from "@mui/material";

export const boxStyles: SxProps<Theme> = {
  marginBottom: "30px",
  width: {
    xs: "100%", 
    sm: "50%", 
    md: "50%",
    lg: "33.33%",
  },
  padding: "15px", 
};

export const cardStyles: SxProps<Theme> = {
  p: 2,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  background: "#fff",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.03)", 
  },
};

export const cardMediaStyles: SxProps<Theme> = {
  borderRadius: "8px",
  objectFit: "cover",
  height: "300px", 
  width: "100%", 
  marginBottom: "15px",
};

export const titleStyles: SxProps<Theme> = {
  fontSize: "1.25rem", 
  color: "#333",
  fontWeight: 600,
  marginBottom: "8px",
  textOverflow: "ellipsis",
  overflow: "hidden",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2, 
  lineHeight: "1.2", 
};

export const overviewBoxStyles: SxProps<Theme> = {
  position: "relative",
  display: "flex",
  alignItems: "center",
  marginTop: "10px", 
};

export const overviewTextStyles: SxProps<Theme> = {
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  lineHeight: 1.5,
  fontSize: "0.95rem",
  color: "#555", 
};

export const tooltipBoxStyles: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  marginTop: "8px",
  gap: "4px", 
};

export const iconButtonStyles: SxProps<Theme> = {
  color: "#555",
  marginTop: "auto", 
  alignSelf: "flex-end", 
};
