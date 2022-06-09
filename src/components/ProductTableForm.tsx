import { FormEvent } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface ProductTableFormProps {
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleClear: () => void;
  idInput: number;
}

export default function ProductTableForm({
  handleChange,
  handleSubmit,
  handleClear,
  idInput,
}: ProductTableFormProps) {
  return (
    <form onSubmit={(e) => handleSubmit(e)} aria-label="id filter form">
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
  );
}
