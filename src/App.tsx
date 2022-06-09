import { useState } from "react";
import { GlobalProvider } from "./context/GlobalState";
import ProductTable from "./components/ProductTable";
import { Container } from "@mui/system";
import { Backdrop, CircularProgress } from "@mui/material";

export default function App() {
  const [loading, setLoading] = useState(false);

  return (
    <GlobalProvider>
      <Container>
        <ProductTable setLoading={setLoading} />

        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Container>
    </GlobalProvider>
  );
}
