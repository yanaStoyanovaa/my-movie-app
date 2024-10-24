import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

export const getMovieRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating); 
    const hasHalfStar = rating - fullStars >= 0.5; 

    for (let i = 1; i <= 10; i++) {
      if (i <= fullStars) {
        stars.push(<StarIcon key={i} sx={{ color: "gold" }} />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<StarHalfIcon key={i} sx={{ color: "gold" }} />);
      } else {
        stars.push(<StarBorderIcon key={i} sx={{ color: "gold" }} />);
      }
    }
    return stars;
  };

