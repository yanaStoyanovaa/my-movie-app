import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

const FullStar = (key: number) => <StarIcon key={key} sx={{ color: "gold" }} />;
const HalfStar = (key: number) => <StarHalfIcon key={key} sx={{ color: "gold" }} />;
const EmptyStar = (key: number) => <StarBorderIcon key={key} sx={{ color: "gold" }} />;

export const getStars = (rating: number):JSX.Element[] => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return Array.from({ length: 10 }, (_, i) => {
    if (i < fullStars) return FullStar(i);
    if (i === fullStars && hasHalfStar) return HalfStar(i);
    return EmptyStar(i);
  });
};



