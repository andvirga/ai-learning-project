import { Container } from "@mui/material";
import { ChatForm } from "../components/ChatForm";
import { Footer } from "../components/Footer";
import { CHARACTERS } from "../types";

export default function Home() {
  return (
    <Container maxWidth="md">
      <ChatForm character={CHARACTERS.davinci} />
      <Footer />
    </Container>
  );
}
