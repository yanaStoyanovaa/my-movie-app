// Home.tsx
"use client";

import React, { useState } from "react";
import { Container } from "@mui/material";
import Results from "./components/Results/Results";
import Search from "./components/Search/Search";
import { MovieType } from "./typings/movieType";
import {
  mainContainerStyles,
  movedUpSearchStyles,
  resultsContainerStyles,
  searchStyles,

} from "./pageStyle";

export default function Home() {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);

  const handleSearchActivated = () => {
    setIsSearchActive(true);
  };

  return (
    <Container sx={mainContainerStyles}>
      <Container sx={isSearchActive ? movedUpSearchStyles : searchStyles}>
        <Search
          setMovies={setMovies}
          onSearchActivated={handleSearchActivated}
        />
      </Container>

      {movies.length > 0 && (
        <Container sx={resultsContainerStyles}>
          <Results movies={movies} />
        </Container>
      )}
    </Container>
  );
}
