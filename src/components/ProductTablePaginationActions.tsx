import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

export interface ProductTablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

export default function ProductTablePaginationActions({
  count,
  page,
  rowsPerPage,
  onPageChange,
}: ProductTablePaginationActionsProps) {
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
