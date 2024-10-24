// app/page.tsx

"use client";

import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import Results from './components/Results';
import Search from './components/Search';
import { MovieType } from './typings/movieType';

export default function Home() {
  const [movies, setMovies] = useState<MovieType[]>([]);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Movie Search App
      </Typography>
      <Search setMovies={setMovies} />
      {movies.length > 0 && <Results movies={movies} />}
    </Container>
  );
}
