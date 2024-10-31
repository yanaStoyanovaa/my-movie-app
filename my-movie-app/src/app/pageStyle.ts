export const searchStyles = {
  padding: "10px",
  transform: "translateY(200%)",
  transition: "transform 0.5s ease-in-out",
};

export const mainContainerStyles = {
  height: "100%",
  padding: "10px",
};

export const movedUpSearchStyles = {
  ...searchStyles,
  transform: "translateY(0%)",
};
export const searchContainerStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export const resultsContainerStyles = {
  marginTop: "10px",
  zIndex: "-100",
  position: "relative"

};
