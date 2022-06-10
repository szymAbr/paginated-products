import { useState, useContext, useEffect, FormEvent } from "react";
import axios from "axios";
import { useAtom } from "jotai";
import { idAtom, pageAtom } from "../atoms";

import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { GlobalState } from "../context/GlobalState";
import ProductTablePaginationActions from "./ProductTablePaginationActions";
import ProductTableBody from "./ProductTableBody";
import ProductTableFooter from "./ProductTableFooter";
import ProductTableHeader from "./ProductTableHeader";
import ProductTableForm from "./ProductTableForm";

interface ProductTableProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProductTable({ setLoading }: ProductTableProps) {
  const { state, dispatch } = useContext(GlobalState);
  const [items, setItems] = useState(state.data);
  const [currentPage, setCurrentPage] = useAtom(pageAtom);
  const [idInput, setIdInput] = useState("");
  const [selectedId, setSelectedId] = useAtom(idAtom);

  // 5 items per page - avoid content jumping
  const emptyRows =
    currentPage > 0 ? Math.max(0, (1 + currentPage) * 5 - items.length) : 0;

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await axios.get("https://reqres.in/api/products");

        dispatch({ type: "SET_PRODUCTS", payload: response.data });
      } catch (error) {
        console.log("error: ", error);
      }
    }

    getProducts();
  }, [dispatch, setLoading]);

  // update items array based on selectedId
  useEffect(() => {
    selectedId
      ? setItems(
          state.data.filter((item) =>
            selectedId ? item.id === selectedId : item.id
          )
        )
      : setItems(state.data);

    setLoading(false);
  }, [state, selectedId, setLoading]);

  function handleChangePage(
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) {
    setCurrentPage(newPage);
  }

  // show only numbers in the input field
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const input = e.target.value;

    input === "" && setIdInput("");

    !isNaN(parseInt(input)) &&
      !isNaN(parseInt(input[input.length - 1])) &&
      parseInt(input) < 10000 &&
      input[0] !== "0" &&
      setIdInput(input);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSelectedId(parseInt(idInput));
    setIdInput("");
  }

  function handleClear() {
    setSelectedId(0);
  }

  return (
    <>
      <Box m={4} sx={{ display: "flex", justifyContent: "center" }}>
        <ProductTableForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleClear={handleClear}
          idInput={idInput}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <TableContainer component={Paper} sx={{ maxWidth: "md" }}>
          <Table aria-label="product table">
            <ProductTableHeader />

            <ProductTableBody
              items={items}
              selectedId={selectedId}
              currentPage={currentPage}
              emptyRows={emptyRows}
            />

            <ProductTableFooter
              items={items}
              currentPage={currentPage}
              handleChangePage={handleChangePage}
              ProductTablePaginationActions={ProductTablePaginationActions}
            />
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
