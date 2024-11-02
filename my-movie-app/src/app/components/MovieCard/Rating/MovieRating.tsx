
import { Tooltip, Box } from "@mui/material";
import { MovieType } from "@/app/typings/movieType";
import { tooltipBoxStyles } from "../MovieCardStyles";
import { getStars } from "./MovieRatingHelper";

export interface MovieRating {
  movie: MovieType
}

export const MovieRating = (props: MovieRating): JSX.Element => {
  const {vote_average, vote_count} = props.movie


  return (
      <Tooltip
        title={`${vote_average?.toFixed(1)} / 10 (${
          vote_count
        } votes)`}
        placement="top"
      >
        <Box sx={tooltipBoxStyles}>{getStars(vote_average)}</Box>
      </Tooltip>
  );
};
