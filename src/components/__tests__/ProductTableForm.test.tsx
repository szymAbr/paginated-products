import { fireEvent, render, screen } from "@testing-library/react";
import ProductTableForm from "../ProductTableForm";

const handleChange = jest.fn();
const handleSubmit = jest.fn();
const handleClear = jest.fn();

describe("ProductTableForm Component", () => {
  it("renders form", () => {
    render(
      <ProductTableForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleClear={handleClear}
        idInput={1}
      />
    );

    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  it("triggers handleChange when input value changed", () => {
    render(
      <ProductTableForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleClear={handleClear}
        idInput={1}
      />
    );

    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: 2 } });

    expect(handleChange).toBeCalledTimes(1);
  });

  it("OK button triggers handleSubmit when clicked", () => {
    render(
      <ProductTableForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleClear={handleClear}
        idInput={1}
      />
    );

    const button = screen.getByRole("button", {
      name: "OK",
    });

    fireEvent.click(button);

    expect(handleSubmit).toBeCalledTimes(1);
  });

  it("CLEAR button triggers handleClear when clicked", () => {
    render(
      <ProductTableForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleClear={handleClear}
        idInput={1}
      />
    );

    const button = screen.getByRole("button", {
      name: "CLEAR",
    });

    fireEvent.click(button);

    expect(handleClear).toBeCalledTimes(1);
  });
});
