import { render, screen, fireEvent, waitFor , act} from "@testing-library/react";
import Search from "../app/components/Search/Search";
import { fetchMovies } from "@/api/fetchMovies";
import { fetchSuggestions } from "@/api/fetchSuggestions";
import "@testing-library/jest-dom";

jest.mock("@/api/fetchMovies");
jest.mock("@/api/fetchSuggestions");

describe("Search Component", () => {
  const setMovies = jest.fn();
  const onSearchActivated = jest.fn();
  const setIsLoading = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    (fetchSuggestions as jest.Mock).mockResolvedValue([]);

  });

  afterEach(() => {
    jest.useRealTimers();
  });


  test("displays suggestions when typing", async () => {
    // Mocking the fetchSuggestions API call
    (fetchSuggestions as jest.Mock).mockResolvedValue([
      { name: "Inception" },
      { name: "Incredible" },
    ]);

    render(
      <Search
        setMovies={setMovies}
        onSearchActivated={onSearchActivated}
        setIsLoading={setIsLoading}
        isSearchActive={false}
      />
    );

    const input = screen.getByLabelText("Search for a movie...");
    fireEvent.change(input, { target: { value: "Inc" } });

    await waitFor(
      () => {
        expect(fetchSuggestions).toHaveBeenCalledWith("Inc");
      },
      { timeout: 2000 }
    );

    await waitFor(
      () => {
        expect(screen.getByText("Inception")).toBeInTheDocument();
        expect(screen.getByText("Incredible")).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  test("initiates search on submit and displays results", async () => {
    (fetchMovies as jest.Mock).mockResolvedValue({
      results: [{ title: "Inception", id: 1 }],
      total_pages: 1,
      total_results: 1,
    });

    render(
      <Search
        setMovies={setMovies}
        onSearchActivated={onSearchActivated}
        setIsLoading={setIsLoading}
        isSearchActive={false}
      />
    );

    const input = screen.getByLabelText("Search for a movie...");
    fireEvent.change(input, { target: { value: "Inception" } });

    act(() => {
        jest.advanceTimersByTime(300); 
      });

    const button = screen.getByTestId("search-btn")
    fireEvent.click(button);

    await waitFor(() => {
      expect(fetchMovies).toHaveBeenCalledWith("Inception", 1);
    });

    expect(setMovies).toHaveBeenCalledWith([{ title: "Inception", id: 1 }]);
    expect(onSearchActivated).toHaveBeenCalled();
  });
  test("displays error message on empty search query", async () => {
    render(
      <Search
        setMovies={setMovies}
        onSearchActivated={onSearchActivated}
        setIsLoading={setIsLoading}
        isSearchActive={false}
      />
    );
  
    const button = screen.getByTestId("search-btn");
    fireEvent.click(button);
  
    await waitFor(() => {
      expect(screen.getByText("Please enter a search term")).toBeInTheDocument();
    });
  });

  test("display no movies found with search", async () => {
    (fetchMovies as jest.Mock).mockResolvedValue({
      results: [],
      total_pages: 1,
      total_results: 1,
    });

    render(
      <Search
        setMovies={setMovies}
        onSearchActivated={onSearchActivated}
        setIsLoading={setIsLoading}
        isSearchActive={true}
      />
    );

    const input = screen.getByLabelText("Search for a movie...");
    fireEvent.change(input, { target: { value: "aaaaaaaaaaaaaaa" } });

    act(() => {
        jest.advanceTimersByTime(300); 
      });

    const button = screen.getByTestId("search-btn")
    fireEvent.click(button);

    await waitFor(() => {
      expect(fetchMovies).toHaveBeenCalledWith("aaaaaaaaaaaaaaa", 1);
    });

    expect(setMovies).toHaveBeenCalledWith([]);

     await waitFor(() => {
    expect(screen.getByText("No movies found. Try different search.")).toBeInTheDocument();
  });
  });

  test("displays results and pagination for successful search", async () => {
    (fetchMovies as jest.Mock).mockResolvedValue({
      results: [{ title: "Inception", id: 1 }, { title: "Mans", id: 2 }],
      total_pages: 3,
      total_results: 3,
    });
  
    render(
      <Search
        setMovies={setMovies}
        onSearchActivated={onSearchActivated}
        setIsLoading={setIsLoading}
        isSearchActive={true}
      />
    );
  
    const input = screen.getByLabelText("Search for a movie...");
    fireEvent.change(input, { target: { value: "Inception" } });
  
    act(() => {
      jest.advanceTimersByTime(300);
    });
  
    fireEvent.click(screen.getByTestId("search-btn"));
  
    await waitFor(() => {
      expect(fetchMovies).toHaveBeenCalledWith("Inception", 1);
      expect(setMovies).toHaveBeenCalledWith([
        { title: "Inception", id: 1 },
        { title: "Mans", id: 2 },
      ]);
    });
  
    expect(screen.getByText(/Showing 2 of 3 results/i)).toBeInTheDocument();
    expect(screen.getByText(/Inception/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Go to page 2" })).toBeInTheDocument();


     fireEvent.click(screen.getByRole("button", { name: "Go to page 2" }));

     await waitFor(() => {
        expect(fetchMovies).toHaveBeenCalledWith("Inception", 2);
      });
    

  });
});
