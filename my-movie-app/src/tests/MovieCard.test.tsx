import { render, screen } from "@testing-library/react";
import MovieCard from "../app/components/MovieCard/MovieCard";
import { MovieType } from "@/app/typings/movieType";
import "@testing-library/jest-dom";

jest.mock("../app/components/MovieCard/Rating/MovieRating.tsx", () => () => <div data-testid="movie-rating" />);
jest.mock("../app/components/MovieCard/MovieInfo/MovieInfo.tsx", () => () => <div data-testid="movie-info" />);

describe("MovieCard Component", () => {
  const mockMovie: MovieType = {
    id: 1,
    title: "Inception",
    overview: "A mind-bending thriller",
    vote_average: 8.3,
    vote_count: 12345,
    poster_path: "/path/to/poster.jpg",
  };

  test("renders movie details", () => {
    render(<MovieCard movie={mockMovie} />);

    expect(screen.getByText("Inception")).toBeInTheDocument();
    expect(screen.getByText("A mind-bending thriller")).toBeInTheDocument();

    const posterImage = screen.getByRole("img");
    expect(posterImage).toHaveAttribute("src", "https://image.tmdb.org/t/p/w500/path/to/poster.jpg");
    expect(posterImage).toHaveAttribute("alt", "Inception");
    expect(screen.getByTestId("movie-rating")).toBeInTheDocument();
  });

  test("displays fallback image and text when no poster or overview", () => {
    const movieWithoutPosterOrOverview = { ...mockMovie, poster_path: null, overview: "" };
    render(<MovieCard movie={movieWithoutPosterOrOverview} />);
    const posterImage = screen.getByRole("img");
    expect(posterImage).toHaveAttribute("src", "/fallBackImage.jpg");
    expect(screen.getByText("No overview available")).toBeInTheDocument();
  });

  test("renders MovieInfo when text overflows", () => {
    Object.defineProperty(HTMLElement.prototype, "scrollHeight", { configurable: true, value: 200 });
    Object.defineProperty(HTMLElement.prototype, "clientHeight", { configurable: true, value: 100 });

    render(<MovieCard movie={mockMovie} />);
        expect(screen.getByTestId("movie-info")).toBeInTheDocument();
  });

  test("does not render MovieInfo when text does not overflow", () => {
    Object.defineProperty(HTMLElement.prototype, "scrollHeight", { configurable: true, value: 100 });
    Object.defineProperty(HTMLElement.prototype, "clientHeight", { configurable: true, value: 100 });

    render(<MovieCard movie={mockMovie} />);
    expect(screen.queryByTestId("movie-info")).not.toBeInTheDocument();
  });

  test("movie empty", () => {
    render(<MovieCard movie={{} as MovieType} />);
    expect(screen.queryByTestId("movie-info")).not.toBeInTheDocument();
    expect(screen.getByText("No overview available")).toBeInTheDocument();
    expect(screen.queryByText("Inception")).not.toBeInTheDocument();
    expect(screen.queryByText("A mind-bending thriller")).not.toBeInTheDocument();
  });


});
