import { Box } from "@mui/material";
import MovieCard from "../MovieCard/MovieCard";
import { MovieType } from "../../typings/movieType";
import { resultsBoxStyles } from "./ResultStyles";

interface ResultsProps {
  movies: MovieType[];
}

const Results = ({ movies}: ResultsProps) => {
  return (
    <Box sx={resultsBoxStyles}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </Box>
  );
};

export default Results;
