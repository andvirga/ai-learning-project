import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import openaiLogo from '../../../public/openai.svg';

export const Footer = (): JSX.Element => {
  return (
    <Box mt={4} py={2} textAlign="center" borderTop={1}>
      <Typography variant="body2" color="textSecondary">
        AI Learning Project
      </Typography>
      <Image src={openaiLogo} alt="OpenAI Logo" width={50} height={50} />
    </Box>
  );
}
