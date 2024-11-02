import { render, screen, fireEvent } from "@testing-library/react";
import ScrollButton from "../app/components/ScrollToTopButton/ScrollButton";
import "@testing-library/jest-dom";

describe("ScrollButton", () => {
  beforeAll(() => {
    Object.defineProperty(window, "scrollTo", {
      value: jest.fn(),
      writable: true,
    });
  });

  test("button is initially hidden", () => {
    render(<ScrollButton />);
    const button = screen.getByTestId("scroll-btn");
    expect(button).toHaveStyle("display: none");
  });

  test("button becomes visible when scrolled down", () => {
    render(<ScrollButton />);

    document.documentElement.scrollTop = 400;
    fireEvent.scroll(window);

    expect( screen.getByTestId("scroll-btn")).toHaveStyle("display: inline");
  });

  test("button hides when scrolled back up", () => {
    render(<ScrollButton />);

    document.documentElement.scrollTop = 400;
    fireEvent.scroll(window);
    expect(screen.getByTestId("scroll-btn")).toHaveStyle("display: inline");

    document.documentElement.scrollTop = 200;
    fireEvent.scroll(window);
    expect(screen.getByTestId("scroll-btn")).toHaveStyle("display: none");
  });

  test("clicking the button scrolls to top", () => {
    render(<ScrollButton />);

    document.documentElement.scrollTop = 400;
    fireEvent.scroll(window);
    const button = screen.getByTestId("scroll-btn");
    
    fireEvent.click(button);
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });
});
