import React, { useState, useEffect } from "react";
import NorthIcon from "@mui/icons-material/North";
import { Button } from "@mui/material";
import { ScrollButtonStyles } from "./ScrollButtonStyles";

const ScrollButton = (): JSX.Element => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = (): void => {
      const scrolled = document.documentElement.scrollTop;
      if (scrolled > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisible);

    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, []);

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button
      sx={{ ...ScrollButtonStyles, display: visible ? "inline" : "none" }}
      onClick={scrollToTop}
      data-testid='scroll-btn'
          >
      <NorthIcon />
    </Button>
  );
};

export default ScrollButton;
