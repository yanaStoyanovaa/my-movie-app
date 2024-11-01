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
import { MovieResponseType } from "@/app/typings/movieResponseType";
import { PaginationType } from "@/app/typings/paginationType";

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
  const [paginationProps, setPaginationProps] = useState<PaginationType>({
    currentPage: 0,
    totalPages: 0,
    totalResults: 0,
    resultsLength: 0,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 900);

    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  const handleSearch = async (
    event: React.FormEvent<HTMLFormElement>,
    currentPage?: number
  ) => {
    event.preventDefault();
    if (!debouncedQuery.trim()) {
      setError("Please enter a search term");
      return;
    }
    setError("");
    setIsLoading(true);

    try {
      if (!currentPage) {
        setPaginationProps((prevProps) => ({
          ...prevProps,
          currentPage: 1,
        }));
        return;
      }
      const data: MovieResponseType = await fetchMovies(
        debouncedQuery,
        currentPage
      );
      setMovies(data.results);
      onSearchActivated();
      setPaginationProps((prevProps) => ({
        ...prevProps,
        totalPages: data.total_pages,
        totalResults: data.total_results,
        resultsLength: data.results?.length ?? 0,
      }));
    } catch (err) {
      setError("Error fetching movies");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (debouncedQuery) {
      handleSearch(
        new Event("submit") as unknown as React.FormEvent<HTMLFormElement>,
        paginationProps.currentPage
      );
    }
  }, [paginationProps.currentPage]);

  useEffect(() => {
    const fetch = async () => {
      if (debouncedQuery.length < 3) {
        setSuggestions([]);
        return;
      }
      try {
        const results = await fetchSuggestions(debouncedQuery);
        const suggestionNames = results.map((s: any) => s.name);
        setSuggestions(suggestionNames);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    fetch();
  }, [debouncedQuery]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPaginationProps((prevProps) => ({
      ...prevProps,
      currentPage: page,
    }));
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
            fullWidth
            onInputChange={(e, value) => setQuery(value)}
            onChange={(e, value) => value && setQuery(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search for a movie..."
                variant="outlined"
                fullWidth
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

      {paginationProps.resultsLength > 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "16px"
          }}
        >
          <Typography
            variant="body1"
            color="textPrimary"
            style={{ fontWeight: "500", fontSize: "1.1rem" }}
          >
            Showing {paginationProps.resultsLength} of{" "}
            {paginationProps.totalResults} results for "
            <span style={{ fontWeight: "bold", fontStyle: "italic" }}>
              {debouncedQuery}
            </span>
            ".
          </Typography>
          <Pagination
            count={paginationProps.totalPages}
            page={paginationProps.currentPage}
            onChange={handlePageChange}
            color="primary"
           />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Search;
