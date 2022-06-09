import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

export default function ProductTableHeader() {
  return (
    <TableHead>
      <TableRow>
        <TableCell>ID</TableCell>

        <TableCell align="right">Name</TableCell>

        <TableCell align="right">Year</TableCell>
      </TableRow>
    </TableHead>
  );
}
