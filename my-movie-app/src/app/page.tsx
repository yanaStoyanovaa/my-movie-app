
"use client";

import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import Results from './components/Results/Results';
import Search from './components/Search/Search';
import { MovieType } from './typings/movieType';

export default function Home() {
  const [movies, setMovies] = useState<MovieType[]>([]);

  return (
    <Container>
      <Search setMovies={setMovies} />
      {movies.length > 0 && <Results movies={movies} />}
    </Container>
  );
}
