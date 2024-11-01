import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { Tooltip, Box } from "@mui/material";
import { MovieType } from "@/app/typings/movieType";
import { tooltipBoxStyles } from "../MovieCardStyles";

export interface MovieRating {
  movie: MovieType
}

export const MovieRating = (props: MovieRating) => {
  const {vote_average, vote_count} = props.movie
  const getStars = (rating: number) => {
    const FullStar = (key: number) => (
      <StarIcon key={key} sx={{ color: "gold" }} />
    );
    const HalfStar = (key: number) => (
      <StarHalfIcon key={key} sx={{ color: "gold" }} />
    );
    const EmptyStar = (key: number) => (
      <StarBorderIcon key={key} sx={{ color: "gold" }} />
    );
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    return Array(10)
      .fill(0)
      .map((_, i) =>
        i < fullStars
          ? FullStar(i)
          : i === fullStars && hasHalfStar
          ? HalfStar(i)
          : EmptyStar(i)
      );
  };

  return (
    <>
      <Tooltip
        title={`${vote_average?.toFixed(1)} / 10 (${
          vote_count
        } votes)`}
        placement="top"
      >
        <Box sx={tooltipBoxStyles}>{getStars(vote_average)}</Box>
      </Tooltip>
    </>
  );
};
