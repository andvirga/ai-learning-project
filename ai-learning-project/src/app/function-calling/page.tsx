import { Container } from "@mui/material";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ChatForm } from "../components/ChatForm";
import { PAGES } from "../types";
import { WeatherForm } from "../components/WeatherForm";

export default function Home() {
  return (
    <>
      <Header />
      <Container maxWidth="md">
        <WeatherForm page={PAGES["function-calling"]} />
      </Container>
      <Footer />
    </>
  );
}
