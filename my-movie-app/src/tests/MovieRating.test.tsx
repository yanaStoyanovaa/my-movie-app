import { render, screen, waitFor } from "@testing-library/react";
import  MovieRating  from "../app/components/MovieCard/Rating/MovieRating";
import { MovieType } from "@/app/typings/movieType";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

jest.mock("../app/components/MovieCard/Rating/MovieRatingHelper.tsx", () => ({
    getStars: jest.fn((rating) => {  
      if (!rating) {
        return Array.from({ length: 10 }, (_, i) => (
          <span key={i} data-testid="empty-star">☆</span>
        ));
      }
  
      const fullStars = Math.floor(rating);
      const hasHalfStar = rating % 1 >= 0.5;
  
      const starsArray = Array.from({ length: 10 }, (_, i) => {
        if (i < fullStars) {
          return <span key={i} data-testid="full-star">★</span>;
        } else if (i === fullStars && hasHalfStar) {
          return <span key={i} data-testid="half-star">☆</span>;
        } else {
          return <span key={i} data-testid="empty-star">☆</span>;
        }
      });
  
      return starsArray;
    }),
  }));
  

describe("MovieRating Component", () => {
  const mockMovie: MovieType = {
    id: 1,
    title: "Inception",
    overview: "A mind-bending thriller",
    vote_average: 8.3,
    vote_count: 12345,
    poster_path: "/path/to/poster.jpg",
  };


  test("renders tooltip with correct rating text", async () => {
    render(<MovieRating movie={mockMovie} />);

    const box = screen.getByTestId("star-tooltip");
    await userEvent.hover(box);

    await waitFor(() =>
      expect(screen.getByText("8.3 / 10 (12345 votes)")).toBeInTheDocument()
    );
  });

  test("renders stars based on vote_average", () => {
    render(<MovieRating movie={mockMovie} />);
    expect(screen.getAllByTestId("full-star").length).toBe(8) 
    expect(screen.getAllByTestId("empty-star").length).toBe(2); 
  });

  test("renders stars based on vote_average 8.6", () => {
    const movieWithHigherRating:MovieType = {...mockMovie, vote_average: 8.6}
    render(<MovieRating movie={movieWithHigherRating} />);

    expect(screen.getAllByTestId("full-star").length).toBe(8) 
    expect(screen.getAllByTestId("empty-star").length).toBe(1); 
    expect(screen.getAllByTestId("half-star").length).toBe(1); 

  });

 
  test("no vote and no count", async () => {
    const movieWithNulls :MovieType = {...mockMovie, vote_average: null as unknown as number, vote_count: undefined as unknown as number}

    render(<MovieRating movie={movieWithNulls} />);

    const box = screen.getByTestId("star-tooltip");
    await userEvent.hover(box);

    await waitFor(() =>
      expect(screen.getByText("0.0 / 10 (0 votes)")).toBeInTheDocument()
    );
  });

  test("no movie", async () => {
    render(<MovieRating movie={{} as unknown as MovieType} />);

    const box = screen.getByTestId("star-tooltip");
    await userEvent.hover(box);

    await waitFor(() =>
      expect(screen.getByText("0.0 / 10 (0 votes)")).toBeInTheDocument()
    );
  });



});
