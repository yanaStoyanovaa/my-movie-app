
"use client"; 

import React, { useState } from 'react';
import { TextField, Button, Container, Box, CircularProgress } from '@mui/material';
import { fetchMovies } from '@/api/tmbd';
import SearchIcon from '@mui/icons-material/Search';
import { MovieType } from '../typings/movieType';

export default function Search({ setMovies }: { setMovies: (movies: MovieType[]) => void }) {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


 
const handleSearch = async () => {
    if (!query.trim()) {
      setError('Please enter a search term');
      return;
    }
    setError('');
    setLoading(true); 
  
    try {
      const movies = await fetchMovies(query);
      setMovies(movies);
    } catch (err) {
      setError('Error fetching movies');
    } finally {
      setLoading(false); 
    }
  };


  return (
    <Container>
          {loading && <CircularProgress />}
     <Box display="flex" alignItems="center" mb={4}>
  <TextField
    label="Search for a movie"
    variant="outlined"
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    fullWidth
    sx={{ borderRadius: '50px', height: '50px' }} // Rounded corners and taller input
    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
  />
  <Button
    variant="contained"
    color="primary"
    onClick={handleSearch}
    sx={{ ml: 2, height: '50px', borderRadius: '50px' }} // Adjust button to match
    startIcon={<SearchIcon />} // Adds a search icon inside the button
  >
    Search
  </Button>
</Box>

      {error && <Box color="error.main">{error}</Box>}
    </Container>
  );
}
