// MovieCardStyles.ts

import { SxProps, Theme } from "@mui/material";

export const boxStyles: SxProps<Theme> = {
  marginBottom: "30px",
  width: {
    xs: "100%", // Full width on small devices
    sm: "50%", // Half width on medium devices
    md: "50%",
    lg: "33.33%", // One-third on large devices
  },
  padding: "15px", // Padding for consistency between cards
};

export const cardStyles: SxProps<Theme> = {
  p: 2,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
  background: "#fff", // Consistent white background for all cards
  transition: "transform 0.2s ease-in-out", // Smooth hover effect
  "&:hover": {
    transform: "scale(1.03)", // Slight scaling on hover
  },
};

export const cardMediaStyles: SxProps<Theme> = {
  borderRadius: "8px",
  objectFit: "cover", // Ensures image covers the whole area
  height: "300px", // Fixed height for all images
  width: "100%", // Full width of the card
  marginBottom: "15px",
};

export const titleStyles: SxProps<Theme> = {
  fontSize: "1.25rem", // Consistent font size for all titles
  color: "#333",
  fontWeight: 600,
  marginBottom: "8px",
  textOverflow: "ellipsis",
  overflow: "hidden",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2, // Limit titles to 2 lines
  lineHeight: "1.2", // Uniform line height for titles
};

export const overviewBoxStyles: SxProps<Theme> = {
  position: "relative",
  display: "flex",
  alignItems: "center",
  marginTop: "10px", // Ensure there's spacing above the text
};

export const overviewTextStyles: SxProps<Theme> = {
  display: "-webkit-box",
  WebkitLineClamp: 3, // Limit overview to 3 lines
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  lineHeight: 1.5,
  fontSize: "0.95rem",
  color: "#555", // Softer color for readability
};

export const tooltipBoxStyles: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start", // Align stars to the left
  marginTop: "8px", // Add consistent spacing above the stars
  gap: "4px", // Add spacing between the stars
};

export const iconButtonStyles: SxProps<Theme> = {
  color: "#555",
  marginTop: "auto", // Pushes the icon button to the bottom
  alignSelf: "flex-end", // Aligns the button to the right
};
