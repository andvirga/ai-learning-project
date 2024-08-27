import { Container } from "@mui/material";
import { ChatForm } from "../components/ChatForm";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { PAGES } from "../types";

export default function Home() {
  return (
    <>
      <Header />
      <Container maxWidth="md">
        <ChatForm page={PAGES["image-analysis"]} />
      </Container>
      <Footer />
    </>
  );
}
