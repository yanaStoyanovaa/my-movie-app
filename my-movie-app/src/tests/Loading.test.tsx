import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Loading from "../app/components/Loading/Loading";

describe("Loading Component", () => {
  test("renders the Backdrop and CircularProgress components", () => {
    render(<Loading />);

    const backdrop = screen.getByTestId("backdrop");
    expect(backdrop).toBeInTheDocument();
    
    const circularProgress = screen.getByRole("progressbar",{ hidden: true }); 
    expect(circularProgress).toBeInTheDocument();
  });

  test("Backdrop is open when rendered", () => {
    render(<Loading />);

    const circularProgress = screen.getByTestId("loading-spinner");
    expect(circularProgress).toBeInTheDocument();
  });
});
