import { SxProps, Theme } from "@mui/material";

// Default container style before the search is activated
export const containerStyles: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",  // Full screen height initially
  textAlign: "center",
  position: "relative",  // Start with position relative
  transition: "all 1.5s ease-in-out",  // Smooth transition for the whole Search container
};

// When search is activated, move the entire search UI to the top
export const movedUpContainerStyles: SxProps<Theme> = {
  ...containerStyles,
  position: "fixed",  // Stick the container at the top
  top: "0",  // Move to the top of the viewport
  left: "0",
  right: "0",
  backgroundColor: "white",  // Keep a consistent background color
  zIndex: 10,  // Ensure it stays above other content
  padding: "10px 0",  // Add some padding around the search bar
  height: "auto",  // Adjust height after search is triggered
};

// Keep form box and heading styles intact, but no need to transition separately now
export const searchHeadingStyles: SxProps<Theme> = {
  fontSize: "2.5rem",  // Adjust heading size
  color: "#333",
  marginBottom: "30px",
  fontWeight: 500,
};

export const formBoxStyles: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  mb: 4,
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  padding: "8px",
  borderRadius: "50px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
};

// TextField styling
export const textFieldStyles: SxProps<Theme> = {
  borderRadius: "30px 0 0 30px",
  height: "50px",
  fontSize: "1rem",
  backgroundColor: "#fff",
  boxShadow: "none",
  paddingLeft: "15px",
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: "none",
    },
    '&:hover fieldset': {
      border: "none",
    },
    '&.Mui-focused fieldset': {
      border: "none",
    },
  },
};

export const buttonStyles: SxProps<Theme> = {
  height: "50px",
  borderRadius: "0 30px 30px 0",
  padding: "0 30px",
  backgroundColor: "#1e88e5",
  fontSize: "1rem",
  '&:hover': {
    backgroundColor: "#1565c0",
  },
};

export const errorBoxStyles: SxProps<Theme> = {
  color: "error.main",
  marginTop: "20px",
};

export const resultsContainerStyles: SxProps<Theme> = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  marginTop: "20px",  // Space between search and results
};
