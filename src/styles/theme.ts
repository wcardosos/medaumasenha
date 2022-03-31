import { extendTheme } from '@chakra-ui/react';

const fonts = {
  body: 'Lato, sans-serif',
  heading: 'Fredoka One, cursive',
};

const styles = {
  global: {
    'html, body': {
      bgColor: 'gray.50',
    },
  },
};

const theme = extendTheme({
  fonts,
  styles,
});

export default theme;
