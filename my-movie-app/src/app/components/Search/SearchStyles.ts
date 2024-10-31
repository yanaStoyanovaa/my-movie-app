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

// TextField styling
export const textFieldStyles: SxProps<Theme> = {

  // fontSize: "1rem",
  // backgroundColor: "#fff",
  // boxShadow: "none",
  // paddingLeft: "15px",
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderRadius: "20px 0 0 20px",
    }
  },
};

export const buttonStyles: SxProps<Theme> = {
   height: "55px",
   borderRadius: "0 20px 20px 0",
  // padding: "0 30px",
  // backgroundColor: "#1e88e5",
  // fontSize: "1rem",
  // '&:hover': {
  //   backgroundColor: "#1565c0",
  // },
};

export const errorBoxStyles: SxProps<Theme> = {
  color: "error.main",
  marginTop: "10px",
};

export const resultsContainerStyles: SxProps<Theme> = {
  // display: "flex",
  // flexWrap: "wrap",
  // justifyContent: "center",
  // marginTop: "20px",  

}
