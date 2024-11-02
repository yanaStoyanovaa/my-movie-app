
import React from "react";
import { CircularProgress, Backdrop } from "@mui/material";
import { backdropStyles } from "./LoadingStyles";

const Loading = ():JSX.Element => {
  return (
    <Backdrop sx={backdropStyles} open={true}>
      <CircularProgress size={100} thickness={5} />
    </Backdrop>
  );
};

export default Loading;
