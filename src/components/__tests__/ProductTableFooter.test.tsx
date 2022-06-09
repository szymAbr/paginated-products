import { render, screen } from "@testing-library/react";
import ProductTableFooter from "../ProductTableFooter";
import ProductTablePaginationActions from "../ProductTablePaginationActions";
import { items } from "./ProductTable.test";

const handleChangePage = jest.fn();

describe("ProductTableFooter Component", () => {
  it("renders table footer", () => {
    render(
      <ProductTableFooter
        items={items}
        currentPage={0}
        handleChangePage={handleChangePage}
        ProductTablePaginationActions={ProductTablePaginationActions}
      />
    );

    expect(screen.getByRole("rowgroup")).toBeInTheDocument();
  });

  it("renders one row", () => {
    render(
      <ProductTableFooter
        items={items}
        currentPage={0}
        handleChangePage={handleChangePage}
        ProductTablePaginationActions={ProductTablePaginationActions}
      />
    );

    expect(screen.getAllByRole("row")).toHaveLength(1);
  });
});
