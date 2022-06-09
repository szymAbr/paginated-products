import { render, screen } from "@testing-library/react";
import ProductTableBody from "../ProductTableBody";
import { items } from "./ProductTable.test";

describe("ProductTableBody Component", () => {
  it("renders table body", () => {
    render(
      <ProductTableBody
        items={items}
        selectedId={0}
        currentPage={0}
        emptyRows={0}
      />
    );

    expect(screen.getByRole("rowgroup")).toBeInTheDocument();
  });

  it("renders five rows", () => {
    render(
      <ProductTableBody
        items={items}
        selectedId={0}
        currentPage={0}
        emptyRows={0}
      />
    );
    
    expect(screen.getAllByRole("row")).toHaveLength(5);
  });
});
