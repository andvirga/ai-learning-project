import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import openaiLogo from "../../../public/openai-white.svg";

export const Header = (): JSX.Element => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <Image src={openaiLogo} alt="OpenAI Logo" width={40} height={40} />
          <Typography variant="h6" sx={{ ml: 2 }}>
            OpenAI
          </Typography>
        </Box>
        <Box>
          <Link href="/text-generation" passHref legacyBehavior>
            <Button color="inherit">Text Generation</Button>
          </Link>
          <Link href="/image-analysis" passHref legacyBehavior>
            <Button color="inherit">Image Analysis</Button>
          </Link>
          <Link href="/function-calling" passHref legacyBehavior>
            <Button color="inherit">Function Calling</Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
