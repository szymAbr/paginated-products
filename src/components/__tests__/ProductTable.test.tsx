import { fireEvent, render, screen } from "@testing-library/react";
import ProductTable from "../ProductTable";

export const items = [
  {
    id: 1,
    name: "cerulean",
    year: 2000,
    color: "#98B2D1",
    pantone_value: "15-4020",
  },
  {
    id: 2,
    name: "fuchsia rose",
    year: 2001,
    color: "#C74375",
    pantone_value: "17-2031",
  },
  {
    id: 3,
    name: "true red",
    year: 2002,
    color: "#BF1932",
    pantone_value: "19-1664",
  },
  {
    id: 4,
    name: "aqua sky",
    year: 2003,
    color: "#7BC4C4",
    pantone_value: "14-4811",
  },
  {
    id: 5,
    name: "tigerlily",
    year: 2004,
    color: "#E2583E",
    pantone_value: "17-1456",
  },
  {
    id: 6,
    name: "blue turquoise",
    year: 2005,
    color: "#53B0AE",
    pantone_value: "15-5217",
  },
];

const setLoading = jest.fn();

describe("ProductTable Component", () => {
  it("renders table", () => {
    render(<ProductTable setLoading={setLoading} />);

    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("sets loading to false", () => {
    render(<ProductTable setLoading={setLoading} />);

    expect(setLoading).toBeCalledWith(false);
  });
});
