import { render, screen } from "@testing-library/react";
import ProductTableHeader from "../ProductTableHeader";

describe("ProductTableHeader Component", () => {
  it("renders table header", () => {
    render(<ProductTableHeader />);

    expect(screen.getAllByRole("columnheader")).toHaveLength(3);
  });
});
