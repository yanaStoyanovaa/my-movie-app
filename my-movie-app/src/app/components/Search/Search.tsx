import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
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
  paginationBoxStyles,
} from "./SearchStyles";
import { MovieResponseType } from "@/app/typings/movieResponseType";
import { PaginationType } from "@/app/typings/paginationType";
import { KeywordResponseType } from "@/app/typings/keywordResponseType";

interface SearchProps {
  setMovies: (movies: MovieType[]) => void;
  onSearchActivated: () => void;
  setIsLoading: (value: boolean) => void;
  isSearchActive: boolean;
}

const Search: React.FC<SearchProps> = ({
  setMovies,
  onSearchActivated,
  setIsLoading,
  isSearchActive,
}) => {
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [paginationProps, setPaginationProps] = useState<PaginationType>({
    currentPage: 1,
    totalPages: 0,
    totalResults: 0,
    resultsLength: 0,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  const resetSearch = (): void => {
    setPaginationProps({
      currentPage: 1,
      totalPages: 0,
      totalResults: 0,
      resultsLength: 0,
    });
    setMovies([]);
  };

  const handleSearch = async (
    event: React.FormEvent<HTMLFormElement> | null,
    searchQuery: string,
    currentPage = 1
  ) => {
    if (event) event.preventDefault();
    if (!searchQuery.trim()) {
      setError("Please enter a search term");
      resetSearch();

      return;
    }
    setError("");
    setIsLoading(true);

    try {
      const data: MovieResponseType = await fetchMovies(
        searchQuery,
        currentPage
      );

      setMovies(data.results);
      onSearchActivated();
      setPaginationProps({
        ...paginationProps,
        currentPage,
        totalPages: data.total_pages,
        totalResults: data.total_results,
        resultsLength: data.results?.length ?? 0,
      });
    } catch (err) {
      setError("Error fetching movies");
      console.error("Error fetching movies:", err);
    } finally {
      setIsLoading(false);
    }
  };

  console.log("isSearchActive", isSearchActive);
  useEffect(() => {
    const fetch = async () => {
      if (debouncedQuery.length < 3) {
        setSuggestions([]);
        return;
      }
      try {
        const results = await fetchSuggestions(debouncedQuery);
        const suggestionNames = results.map((el: KeywordResponseType) => el.name);
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
    handleSearch(null, debouncedQuery, page);
  };

  return (
    <>
      <Typography sx={searchHeadingStyles} variant="h2">
        Find Your Favorite Movies
      </Typography>

      <form
        style={{ width: "100%" }}
        onSubmit={(e) => handleSearch(e, debouncedQuery)}
      >
        <Box sx={formBoxStyles}>
          <Autocomplete
            freeSolo
            options={suggestions}
            fullWidth
            onInputChange={(e, value) => setQuery(value)}
            onChange={(e, value) => {
              if (value) {
                setQuery(value);
                setDebouncedQuery(value);
                handleSearch(null, value);
              }
            }}
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
        <Box
          sx={paginationBoxStyles}
          >
          <Typography
            variant="body1"
            color="textPrimary"
            style={{ fontWeight: "500", fontSize: "1.1rem"}}
          >
            Showing {paginationProps.resultsLength} of{" "}
            {paginationProps.totalResults} results for &quot;
            <span style={{ fontWeight: "bold", fontStyle: "italic" }}>
              {debouncedQuery}
            </span>
            &quot;.
          </Typography>
          <Pagination
            count={paginationProps.totalPages}
            page={paginationProps.currentPage}
            onChange={handlePageChange}
            color="primary"

          />
        </Box>
      ) : (
        <Typography
          variant="body1"
          color="textPrimary"
          style={{ fontWeight: "500", fontSize: "1.1rem", marginTop: "16px" }}
        >
          {isSearchActive
            ? error
              ? ""
              : "No movies found. Try different search."
            : "Results will be showed here."}
        </Typography>
      )}
    </>
  );
};

export default Search;
