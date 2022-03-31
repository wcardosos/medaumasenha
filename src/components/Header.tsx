import React from 'react';
import {
  Box,
  Image,
} from '@chakra-ui/react';

export default function Header() {
  return (
    <Box
      data-testid="header"
      w="100%"
      h="10vh"
    >
      <Image
        src="/brand/logo.png"
        alt="Logo medaumasenha"
        maxH={['8', '16']}
      />
    </Box>
  );
}
