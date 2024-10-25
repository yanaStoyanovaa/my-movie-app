import { Box } from "@mui/material";
import MovieCard from "../MovieCard/MovieCard";
import { MovieType } from "../../typings/movieType";
import { resultsBoxStyles } from "./ResultStyles";

const Results = ({ movies }: { movies: MovieType[] }) => {
  return (
    <Box sx={resultsBoxStyles}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </Box>
  );
};

export default Results;
