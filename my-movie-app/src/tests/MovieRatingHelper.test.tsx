import "@testing-library/jest-dom";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { getStars } from "../app/components/MovieCard/Rating/MovieRatingHelper";

describe("getStars", () => {
  const countStars = (elements: JSX.Element[], type: React.ElementType) =>
    elements.filter((element) => element.type === type).length;

  test("renders correct number of full stars for integer rating", () => {
    const rating = 7;
    const stars = getStars(rating);

    expect(countStars(stars, StarIcon)).toBe(7); 
    expect(countStars(stars, StarBorderIcon)).toBe(3); 
    expect(countStars(stars, StarHalfIcon)).toBe(0);
  });

  test("renders a half star for rating with 0.5", () => {
    const rating = 6.5;
    const stars = getStars(rating);

    expect(countStars(stars, StarIcon)).toBe(6); 
    expect(countStars(stars, StarHalfIcon)).toBe(1); 
    expect(countStars(stars, StarBorderIcon)).toBe(3); 
  });

  test("renders all empty stars for rating of 0", () => {
    const rating = 0;
    const stars = getStars(rating);

    expect(countStars(stars, StarIcon)).toBe(0); 
    expect(countStars(stars, StarHalfIcon)).toBe(0); 
    expect(countStars(stars, StarBorderIcon)).toBe(10); 
  });

  test("renders all full stars for rating of 10", () => {
    const rating = 10;
    const stars = getStars(rating);

    expect(countStars(stars, StarIcon)).toBe(10); 
    expect(countStars(stars, StarHalfIcon)).toBe(0); 
    expect(countStars(stars, StarBorderIcon)).toBe(0); 
  });

  test("renders all empty stars when rating is undefined", () => {
    const stars = getStars(undefined as unknown as number);

    expect(countStars(stars, StarIcon)).toBe(0);
    expect(countStars(stars, StarHalfIcon)).toBe(0); 
    expect(countStars(stars, StarBorderIcon)).toBe(10); 
  });

  test("renders all empty stars when rating is null", () => {
    const stars = getStars(null as unknown as number);

    expect(countStars(stars, StarIcon)).toBe(0); 
    expect(countStars(stars, StarHalfIcon)).toBe(0);
    expect(countStars(stars, StarBorderIcon)).toBe(10);
  });


});
