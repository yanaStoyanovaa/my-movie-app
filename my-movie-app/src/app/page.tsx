"use client";

import React, { useState } from 'react';
import { Container } from '@mui/material';
import Results from './components/Results/Results';
import Search from './components/Search/Search';
import { MovieType } from './typings/movieType';
import { containerStyles, movedUpContainerStyles } from './components/Search/SearchStyles';

export default function Home() {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);  // Track when search is active

  // Trigger search animation when movies are fetched
  const handleSearchActivated = () => {
    setIsSearchActive(true);  // Set search as active to trigger animation
  };

  return (
    <Container sx={isSearchActive ? movedUpContainerStyles : containerStyles}>
      {/* Pass down the trigger handler to Search component */}
      <Search setMovies={setMovies} onSearchActivated={handleSearchActivated} />
      
      {/* Show Results after movies are fetched */}
      {movies.length > 0 && (
        <Container sx={{ marginTop: '100px' }}>
          <Results movies={movies} />
        </Container>
      )}
    </Container>
  );
}
