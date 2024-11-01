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
import Loading from "./components/Loading/Loading";

export default function Home() {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearchActivated = ():void => {
    setIsSearchActive(true);
  };

  const handleIsLoading = (value: boolean):void => {
    setIsLoading(value);
  };


  return (
    <Container sx={mainContainerStyles}>
      <Container sx={isSearchActive ? movedUpSearchStyles : searchStyles}>
        <Search
          setMovies={setMovies}
          onSearchActivated={handleSearchActivated}
          setIsLoading={handleIsLoading}
        />
      </Container>

      {isLoading && <Loading />}
      {movies?.length > 0 && (
        <Container sx={resultsContainerStyles}>
          <Results movies={movies} />
        </Container>
      )}
      {isSearchActive && movies?.length === 0 && <>No movies found</>}
    </Container>
  );
}
