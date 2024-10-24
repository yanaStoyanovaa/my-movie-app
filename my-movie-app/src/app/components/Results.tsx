import {
    Box,
  } from "@mui/material";
import MovieCard from "./MovieCard";
import { MovieType } from "../typings/movieType";

  
   const Results = ({ movies }: { movies: MovieType[] }) => {
    return (
      <Box display="flex" flexWrap="wrap" justifyContent="space-between">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Box>
    );
  };

  export default Results
