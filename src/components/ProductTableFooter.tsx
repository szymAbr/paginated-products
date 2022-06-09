import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import TableFooter from "@mui/material/TableFooter";
import { ProductTablePaginationActionsProps } from "./ProductTablePaginationActions";
import { DataItems } from "../context/GlobalState";

interface ProductTableFooterProps {
  items: DataItems;
  currentPage: number;
  handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  ProductTablePaginationActions: ({
    count,
    page,
    rowsPerPage,
    onPageChange,
  }: ProductTablePaginationActionsProps) => JSX.Element;
}

export default function ProductTableFooter({
  items,
  currentPage,
  handleChangePage,
  ProductTablePaginationActions,
}: ProductTableFooterProps) {
  return (
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
          ActionsComponent={ProductTablePaginationActions}
        />
      </TableRow>
    </TableFooter>
  );
}
