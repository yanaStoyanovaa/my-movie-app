// components/ScrollButton.js

import React, { useState } from "react";
import NorthIcon from "@mui/icons-material/North";
import { Button } from "@mui/material";
import { ScrollButtonStyles } from "./ScrollButtonStyles";

const ScrollButton = (): JSX.Element => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = (): void => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = ():void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <Button
      sx={{ ...ScrollButtonStyles, display: visible ? "inline" : "none" }}
      onClick={scrollToTop}
    >
      <NorthIcon />
    </Button>
  );
};

export default ScrollButton;