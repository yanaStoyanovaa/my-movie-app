import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";

export const iconButtonStyles: SxProps<Theme> = {
    marginTop: "auto", 
    alignSelf: "flex-end", 
    color: '#666', 
    '&:hover': {
      color: '#333', 
    },
  };
  
  
  export const toolTipStyles: SxProps<Theme> = {
    backgroundColor: '#555', 
    color: '#fff', 
    fontSize: '16px',
    padding: '12px', 
    borderRadius: '8px', 
    maxWidth: '250px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)', 
  
  };
  