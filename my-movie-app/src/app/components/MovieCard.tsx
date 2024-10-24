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
import { getMovieRating } from "./MovieRating";

// MovieCard component using arrow function
const MovieCard = ({ movie }: { movie: any }) => {
  const [isTextOverflowing, setIsTextOverflowing] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  // Check if the overview is overflowing (truncated)
  useEffect(() => {
    if (textRef.current) {
      const { scrollHeight, clientHeight } = textRef.current;
      setIsTextOverflowing(scrollHeight > clientHeight);
    }
  }, [movie.overview]);


  //todo check for bigger titles

  return (
    <Box
      sx={{
        marginBottom: "30px !important",
        width: {
          xs: "100%", // 1 card per row on extra small screens (mobile)
          sm: "50%", // 2 cards per row on small screens (tablets)
          md: "50%", // 2 cards per row on medium screens (larger tablets)
          lg: "33.33%", // 3 cards per row on large screens (desktop)
        },
      }}
    >
      <Card
        sx={{
          p: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardMedia
          component="img"
          height="400"
          image={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/no-image.png"
          }
          alt={movie.title}
          sx={{ borderRadius: "8px" }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          {/* Set a fixed height for the title */}
          <Typography
            variant="h6"
            gutterBottom
            fontWeight="bold"
            sx={{
              height: "4rem", // Adjust as necessary based on expected title lengths
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {movie.title}
          </Typography>

             {/* Votes and Rating Display */}
             <Tooltip title={`${movie.vote_average.toFixed(1)} / 10`} placement="top">
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
              {/* Render 10 stars, including full, half, and empty stars */}
              {getMovieRating(movie.vote_average)}
            </Box>
          </Tooltip>

          {/* Display the number of votes */}
          <Typography variant="body2" sx={{ mt: 1 }}>
            {movie.vote_count} votes
          </Typography>

          {/* Overview text */}
          <Box
            sx={{ position: "relative", display: "flex", alignItems: "center" }}
          >
            <Typography
              ref={textRef} // Use ref to detect if the text is overflowing
              variant="body2"
              color="textSecondary"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                height: "75px", // Keep a consistent height for the overview
                flexGrow: 1,
              }}
            >
              {movie.overview || "No overview available"}
            </Typography>

            {/* Show the tooltip icon if the text is overflowing */}
            {isTextOverflowing && (
              <Tooltip title={movie.overview} placement="top">
                <IconButton
                  size="small"
                  sx={{
                    ml: 1,
                    alignSelf: "flex-end", // Align icon at the bottom right of the text
                  }}
                >
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MovieCard;
