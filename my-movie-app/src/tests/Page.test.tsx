import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import Home from "../app/page";
import { MovieType } from "@/app/typings/movieType";
import "@testing-library/jest-dom";


jest.mock("../app/components/Search/Search.tsx", () => ({ setMovies, onSearchActivated, setIsLoading }: {setMovies: ([]) => void, onSearchActivated: () => void, setIsLoading: (arg0: boolean) => void}) => (
  <div data-testid="search-component" onClick={() => {
    setMovies([{ title: "Inception", id: 1 }]);
    onSearchActivated();
    setIsLoading(true);
  }}>
    Search Component
  </div>
));

jest.mock("../app/components/Results/Results.tsx", () => ({ movies }: {movies: MovieType[]}) => (
  <div data-testid="results-component">
    {movies.length} Movie(s) Found
  </div>
));

jest.mock("../app/components/Loading/Loading.tsx", () => () => <div data-testid="loading-component">Loading...</div>);

jest.mock("../app/components/ScrollToTopButton/ScrollButton.tsx", () => () => <div data-testid="scroll-button">Scroll to Top</div>);

describe("Home Component", () => {
  test("renders the initial layout correctly", () => {
    render(<Home />);

    expect(screen.getByTestId("search-component")).toBeInTheDocument();
    expect(screen.queryByTestId("loading-component")).not.toBeInTheDocument();
    expect(screen.queryByTestId("results-component")).not.toBeInTheDocument();
    expect(screen.getByTestId("scroll-button")).toBeInTheDocument();
  });

  test("activates search and updates layout", async () => {
    render(<Home />);

    fireEvent.click(screen.getByTestId("search-component"));
    expect(screen.getByTestId("loading-component")).toBeInTheDocument();
    await act(async () => {
      jest.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(screen.getByTestId("results-component")).toBeInTheDocument();
    });

    expect(screen.getByText("1 Movie(s) Found")).toBeInTheDocument();
  });

  test("displays 'Loading' component when isLoading is true", async () => {
    render(<Home />);

    fireEvent.click(screen.getByTestId("search-component"));

    expect(screen.getByTestId("loading-component")).toBeInTheDocument();
  });

  test("renders delayed results after search", async () => {
    render(<Home />);

    fireEvent.click(screen.getByTestId("search-component"));

    act(() => {
      jest.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(screen.getByTestId("results-component")).toBeInTheDocument();
    });
  });
});
