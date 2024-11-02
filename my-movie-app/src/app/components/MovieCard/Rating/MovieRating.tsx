
import { Tooltip, Box } from "@mui/material";
import { MovieType } from "@/app/typings/movieType";
import { tooltipBoxStyles } from "../MovieCardStyles";
import { getStars } from "./MovieRatingHelper";

const MovieRating = ({movie}: {movie: MovieType}): JSX.Element => {
  const {vote_average, vote_count} = movie
  const averageVote = vote_average ?? 0
  const voteCount = vote_count ?? 0


  return (
      <Tooltip
        title={`${averageVote?.toFixed(1)} / 10 (${
          voteCount
        } votes)`}
        placement="top"
        data-testid='star-tooltip'
      >
        <Box sx={tooltipBoxStyles}>{getStars(averageVote)}</Box>
      </Tooltip>
  );
};

export default MovieRating;