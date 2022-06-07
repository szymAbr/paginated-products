import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useContext, useEffect } from "react";
import { GlobalState } from "../context/GlobalState";

export default function Products() {
  const { state, dispatch } = useContext(GlobalState);

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await axios.get("https://reqres.in/api/products");
        console.log("response: ", response);
        dispatch({ type: "SET_PRODUCTS", payload: response.data });
      } catch (error) {
        console.log("error: ", error);
      }
    }

    getProducts();
  }, []);

  useEffect(() => {
    console.log("STATE UPDATED: ", state);
  }, [state]);

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item>
          <Button variant="outlined">button test</Button>
        </Grid>

        <Grid item>
          <Button variant="outlined">button test</Button>
        </Grid>

        <Grid item>
          <Button variant="outlined">button test</Button>
        </Grid>
      </Grid>
    </Container>
  );
}
