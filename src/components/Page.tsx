import React from 'react';
import { Box } from '@chakra-ui/react';

export interface IPageProps {
  children: React.ReactNode
}

export default function Page({ children }: IPageProps) {
  return (
    <Box px={['6', '32']}>
      {children}
    </Box>
  );
}
