import { Container } from "@mui/material";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ChatForm } from "../components/ChatForm";
import { PAGES } from "../types";

export default function Home() {
  return (
    <>
      <Header />
      <Container maxWidth="md">
        <ChatForm page={PAGES["text-generation"]} />
      </Container>
      <Footer />
    </>
  );
}
