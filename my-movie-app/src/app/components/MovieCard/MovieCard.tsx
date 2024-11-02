
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Tooltip,
  IconButton,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useState, useRef, useEffect } from "react";
import {
  cardStyles,
  cardMediaStyles,
  titleStyles,
  overviewTextStyles,
  iconButtonStyles,
  boxStyles,
  overviewBoxStyles,
} from "./MovieCardStyles";
import { MovieRating } from "./Rating/MovieRating";
import { MovieType } from "@/app/typings/movieType";

const MovieCard = ({ movie }: { movie: MovieType }):JSX.Element => {
  const [isTextOverflowing, setIsTextOverflowing] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const { scrollHeight, clientHeight } = textRef.current;
      setIsTextOverflowing(scrollHeight > clientHeight);
    }
  }, [movie.overview]);

  return (
    <Box sx={boxStyles}>
      <Card sx={cardStyles}>
        <CardMedia
          component="img"
          image={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/fallBackImage.jpg"
          }
          alt={movie.title}
          sx={cardMediaStyles}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" gutterBottom sx={titleStyles}>
            {movie.title}
          </Typography>
          <Box>
            <MovieRating movie={movie} />
          </Box>
          <Box sx={overviewBoxStyles}>
            <Typography
              ref={textRef}
              variant="body2"
              color="textSecondary"
              sx={overviewTextStyles}
            >
              {movie.overview || "No overview available"}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "auto",
              }}
            >
              {isTextOverflowing && (
                <Tooltip title={movie.overview} placement="top">
                  <IconButton size="small" sx={iconButtonStyles}>
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MovieCard;
