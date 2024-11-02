import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box
} from "@mui/material";
import { useState, useRef, useEffect } from "react";
import {
  cardStyles,
  cardMediaStyles,
  titleStyles,
  overviewTextStyles,
  boxStyles,
  overviewBoxStyles,
} from "./MovieCardStyles";
import  MovieRating  from "./Rating/MovieRating";
import { MovieType } from "@/app/typings/movieType";
import MovieInfo from "./MovieInfo/MovieInfo";

const MovieCard = ({ movie }: { movie: MovieType }): JSX.Element => {
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
                <MovieInfo movie={movie}/>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MovieCard;
