"use client";

import React, { useEffect, useState } from "react";
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
  const [delayedMovies, setDelayedMovies] = useState<MovieType[]>([]);
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearchActivated = ():void => {
    setIsSearchActive(true);
  };

  const handleIsLoading = (value: boolean):void => {
    setIsLoading(value);
  };

  useEffect(() => {
    if (movies?.length > 0) {
      const delayTimer = setTimeout(() => {
         setDelayedMovies(movies);
      }, 300); // 0.5 seconds delay
      
      return () => clearTimeout(delayTimer); // Clean up the timer on unmount or if `movies` changes
    } else {
      setDelayedMovies([]);
    }
  }, [movies]);
  

  return (
    <Container sx={mainContainerStyles}>
      <Container sx={isSearchActive ? movedUpSearchStyles : searchStyles}>
        <Search
          setMovies={setMovies}
          onSearchActivated={handleSearchActivated}
          setIsLoading={handleIsLoading}
          isSearchActive={isSearchActive}
        />
      </Container>

      {isLoading && <Loading />}
      {delayedMovies?.length > 0 && (
        <Container sx={resultsContainerStyles}>
          <Results movies={movies} />
        </Container>
      )}
    </Container>
  );
}
