import { Box } from "@mui/material";
import MovieCard from "../MovieCard/MovieCard";
import { MovieType } from "../../typings/movieType";
import { resultsBoxStyles } from "./ResultStyles";

interface ResultsProps {
  movies: MovieType[];
}

const Results = ({ movies }: ResultsProps): JSX.Element => {
  if (!movies) return <></>;
  return (
    <Box data-testid='results' sx={resultsBoxStyles}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </Box>
  );
};

export default Results;
