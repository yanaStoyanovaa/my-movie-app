import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Box,
  CircularProgress,
  Autocomplete,
  Typography,
  Pagination,
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
import Loading from "../Loading/Loading";

interface SearchProps {
  setMovies: (movies: MovieType[]) => void;
  onSearchActivated: () => void;
  setIsLoading: (value: boolean) => void;
}

const Search: React.FC<SearchProps> = ({
  setMovies,
  onSearchActivated,
  setIsLoading,
}) => {
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 900);

    return () => {
      clearTimeout(timer); 
    };
  }, [query]);

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!debouncedQuery.trim()) {
      setError("Please enter a search term");
      return;
    }
    setError("");
    setIsLoading(true);

    try {
      const data = await fetchMovies(debouncedQuery, currentPage);
      setMovies(data.results); 
      onSearchActivated(); 
      setTotalPages(data.total_pages)
    } catch (err) {
      setError("Error fetching movies");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (debouncedQuery) {
      handleSearch(
        new Event("submit") as unknown as React.FormEvent<HTMLFormElement>
      );
    }
  }, [currentPage]);

  useEffect(() => {
    const fetch = async () => {
      if (debouncedQuery.length < 3) {
        setSuggestions([]);
        return;
      }

      setLoadingSuggestions(true);
      try {
        const results = await fetchSuggestions(debouncedQuery);
        const suggestionNames = results.map((s: any) => s.name);
        setSuggestions(suggestionNames);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      } finally {
        setLoadingSuggestions(false);
      }
    };

    fetch();
  }, [debouncedQuery]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Typography sx={searchHeadingStyles} variant="h2">
        Find Your Favorite Movies
      </Typography>

      <form style={{ width: "100%" }} onSubmit={handleSearch}>
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
      
            <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        sx={{ marginTop: 2 }}
      />
    </>
  );
};

export default Search;
