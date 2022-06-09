import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { DataItems } from "../context/GlobalState";

interface ProductTableBodyProps {
  items: DataItems;
  selectedId: number;
  currentPage: number;
  emptyRows: number;
}

export default function ProductTableBody({
  items,
  selectedId,
  currentPage,
  emptyRows,
}: ProductTableBodyProps) {
  return (
    <TableBody>
      {items
        .filter((item) => (selectedId ? item.id === selectedId : item.id))
        .slice(currentPage * 5, currentPage * 5 + 5)
        .map(({ id, name, year, color }) => (
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
  );
}
