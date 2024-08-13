import { Container } from "@mui/material";
import { Footer } from "../components/Footer";
import { ChatForm } from "../components/ChatForm";

import { CHARACTERS } from "../types";

export default function Home() {
  return (
    <Container maxWidth="md">
      <ChatForm character={CHARACTERS.einstein} />
      <Footer />
    </Container>
  );
}
