import { Container } from "@mui/material";
import { Footer } from "./components/Footer";
import { Main } from "./components/Main";

export default function Home() {
  return (
    <Container maxWidth="md">
      <Main />
      <Footer />
    </Container>
  );
}
