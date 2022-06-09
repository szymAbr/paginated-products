import { useState, useContext, useEffect, FormEvent } from "react";
import axios from "axios";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import TableFooter from "@mui/material/TableFooter";
import TextField from "@mui/material/TextField";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Button from "@mui/material/Button";
import { GlobalState } from "../context/GlobalState";

interface ProductTableProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProductTable({ setLoading }: ProductTableProps) {
  const { state, dispatch } = useContext(GlobalState);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  // const [itemsPerPage, setItemsPerPage] = useState(0);
  const [idInput, setIdInput] = useState(0);
  const [selectedId, setSelectedId] = useState(0);

  // 5 items per page
  const emptyRows =
    currentPage > 0 ? Math.max(0, (1 + currentPage) * 5 - items.length) : 0;

  useEffect(() => {
    async function getProducts() {
      try {
        setLoading(true);
        const response = await axios.get("https://reqres.in/api/products");

        dispatch({ type: "SET_PRODUCTS", payload: response.data });
      } catch (error) {
        console.log("error: ", error);
      }
    }

    getProducts();
  }, [dispatch, setLoading]);

  useEffect(() => {
    setItems(state.data);
    setLoading(false);
  }, [state]);

  function handleChangePage(
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) {
    setCurrentPage(newPage);
  }

  interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
      event: React.MouseEvent<HTMLButtonElement>,
      newPage: number
    ) => void;
  }

  function TablePaginationActions({
    count,
    page,
    rowsPerPage,
    onPageChange,
  }: TablePaginationActionsProps) {
    function handleBackButtonClick(event: React.MouseEvent<HTMLButtonElement>) {
      onPageChange(event, page - 1);
    }

    function handleNextButtonClick(event: React.MouseEvent<HTMLButtonElement>) {
      onPageChange(event, page + 1);
    }

    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          <KeyboardArrowLeft />
        </IconButton>

        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          <KeyboardArrowRight />
        </IconButton>
      </Box>
    );
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const input = parseInt(e.target.value);

    !isNaN(input) && input >= 0 && input < 10000 && setIdInput(input);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSelectedId(idInput);
  }

  function handleClear() {
    setIdInput(0);
    setSelectedId(0);
  }

  return (
    <>
      <Box m={4} sx={{ display: "flex", justifyContent: "center" }}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <TextField
            id="outlined-basic"
            label="Filter by ID"
            variant="outlined"
            type="text"
            value={idInput ? idInput : ""}
            onChange={(e) => handleChange(e)}
          />

          <Box sx={{ my: 2, display: "flex", justifyContent: "space-evenly" }}>
            <Button
              type="submit"
              variant="contained"
              color="success"
              sx={{ width: "40%" }}
            >
              OK
            </Button>

            <Button
              variant="outlined"
              color="success"
              onClick={handleClear}
              sx={{ width: "40%" }}
            >
              CLEAR
            </Button>
          </Box>
        </form>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <TableContainer component={Paper} sx={{ maxWidth: "md" }}>
          <Table aria-label="product table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>

                <TableCell align="right">Name</TableCell>

                <TableCell align="right">Year</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {items
                .filter((item) =>
                  selectedId ? item["id"] === selectedId : item["id"]
                )
                .slice(currentPage * 5, currentPage * 5 + 5)
                .map(({ id, name, year, color, pantone_value }) => (
                  <TableRow
                    key={id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      bgcolor: color,
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {id}
                    </TableCell>

                    <TableCell align="right">{name}</TableCell>

                    <TableCell align="right">{year}</TableCell>
                  </TableRow>
                ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[]}
                  colSpan={3}
                  count={items.length}
                  rowsPerPage={5}
                  page={currentPage}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
