// components/Search.tsx

"use client";

import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Box,
  CircularProgress,
  Autocomplete,
} from "@mui/material";
import { fetchMovies } from "@/api/fetchMovies";
import { fetchSuggestions } from "@/api/fetchSuggestions";
import SearchIcon from "@mui/icons-material/Search";
import { MovieType } from "../../typings/movieType";
import Loading from "../Loading/Loading";
import {
  containerStyles,
  formBoxStyles,
  textFieldStyles,
  buttonStyles,
  errorBoxStyles,
} from "./SearchStyles";

const Search = ({
  setMovies,
}: {
  setMovies: (movies: MovieType[]) => void;
}) => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!query.trim()) {
      setError("Please enter a search term");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const movies = await fetchMovies(query);
      setMovies(movies);
    } catch (err) {
      setError("Error fetching movies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      if (query.length < 3) {
        setSuggestions([]);
        return;
      }

      setLoadingSuggestions(true);
      try {
        const results = await fetchSuggestions(query);
        const suggestionNames = results.map((s: any) => s.name);
        setSuggestions(suggestionNames);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      } finally {
        setLoadingSuggestions(false);
      }
    };

    fetch();
  }, [query]);

  if (loading) {
    return <Loading />;
  }
  return (
    <Container sx={containerStyles}>
      <form onSubmit={handleSearch}>
        <Box sx={formBoxStyles}>
          <Autocomplete
            freeSolo
            options={suggestions}
            loading={loadingSuggestions}
            fullWidth
            onInputChange={(e, value) => setQuery(value)}
            onChange={(e, value) => value && setQuery(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search for a movie"
                variant="outlined"
                fullWidth
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loadingSuggestions ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
                sx={textFieldStyles}
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={buttonStyles}
            startIcon={<SearchIcon />}
          >
            Search
          </Button>
        </Box>
      </form>

      {error && <Box sx={errorBoxStyles}>{error}</Box>}
    </Container>
  );
};

export default Search;
