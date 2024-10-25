// components/Results.tsx

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

const MovieCard = ({ movie }: { movie: any }) => {
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
        {/* Ensure all images have the same fixed height and width */}
        <CardMedia
          component="img"
          image={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/no-image.png"
          }
          alt={movie.title}
          sx={cardMediaStyles}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          {/* Consistent font size and weight for titles */}
          <Typography variant="h6" gutterBottom sx={titleStyles}>
            {movie.title}
          </Typography>

          {/* Ensure the star rating is properly aligned */}
          <Box>
            <MovieRating movie={movie} />
          </Box>

          {/* Consistent layout and handling of overview text */}
          <Box sx={overviewBoxStyles}>
            <Typography
              ref={textRef}
              variant="body2"
              color="textSecondary"
              sx={overviewTextStyles}
            >
              {movie.overview || "No overview available"}
            </Typography>

            {/* Separate Box to align the Info Button at the bottom */}
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
