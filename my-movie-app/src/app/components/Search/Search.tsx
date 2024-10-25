import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Box,
  CircularProgress,
  Autocomplete,
  Typography,
} from "@mui/material";
import { fetchMovies } from "@/api/fetchMovies";
import { fetchSuggestions } from "@/api/fetchSuggestions";
import SearchIcon from "@mui/icons-material/Search";
import { MovieType } from "../../typings/movieType";
import {
  formBoxStyles,
  textFieldStyles,
  buttonStyles,
  errorBoxStyles,
  searchHeadingStyles,
} from "./SearchStyles";

interface SearchProps {
  setMovies: (movies: MovieType[]) => void;
  onSearchActivated: () => void;  // Prop to trigger the animation when search is performed
}

const Search: React.FC<SearchProps> = ({ setMovies, onSearchActivated }) => {
  const [query, setQuery] = useState<string>("");  // Search query state
  const [error, setError] = useState<string>("");  // Error message state
  const [loading, setLoading] = useState<boolean>(false);  // Loading state for movie fetch
  const [suggestions, setSuggestions] = useState<string[]>([]);  // Suggestions state
  const [loadingSuggestions, setLoadingSuggestions] = useState<boolean>(false);  // Loading state for suggestions

  // Handle the search form submission
  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!query.trim()) {
      setError("Please enter a search term");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const movies = await fetchMovies(query);
      setMovies(movies);  // Set the movies in the parent component
      onSearchActivated();  // Trigger the animation
    } catch (err) {
      setError("Error fetching movies");
    } finally {
      setLoading(false);
    }
  };

  // Fetch movie suggestions based on query input
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

  return (
    <Container>
      <Typography sx={searchHeadingStyles} variant="h2">
        Find Your Favorite Movies
      </Typography>

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
                label="Search for a movie..."
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
