import Results from '../app/components/Results/Results';
import { MovieType } from '@/app/typings/movieType';
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'; 

describe("Results Component", () => {
  const mockMovies: MovieType[] = [
    {
      id: 1,
      title: "Inception",
      overview: "A mind-bending thriller.",
      poster_path: "/inception.jpg",
      vote_average: 9,
      vote_count: 78
    },
    {
      id: 2,
      title: "The Matrix",
      overview: "A hacker discovers reality is a simulation.",
      poster_path: "/matrix.jpg",
      vote_average: 7,
      vote_count: 23
    },
  ];

  test("renders a list of movies", () => {
    render(<Results movies={mockMovies} />);
    expect(screen.getByTestId("results")).toBeInTheDocument()

    mockMovies.forEach((movie) => {
      expect(screen.getByText(movie.title)).toBeInTheDocument();
      expect(screen.getByText(movie.overview)).toBeInTheDocument();

    });
  });

  test("displays no movies list is empty", () => {
    render(<Results movies={[]} />);
    expect(screen.queryByTestId("results")).toBeInTheDocument()
    expect(screen.queryAllByTestId("movie-card")).toHaveLength(0);
  });


  test("displays no movies list is empty", () => {
    render(<Results movies={undefined as unknown as []} />);
    expect(screen.queryByTestId("results")).not.toBeInTheDocument()
  });

  test("displays no movies list is empty", () => {
    render(<Results movies={null as unknown as []} />);
    expect(screen.queryByTestId("results")).not.toBeInTheDocument()
  });

});
