import { AppProps } from 'next/app';
import '../styles/index.css';
import { ReactElement } from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const breakpoints = createBreakpoints({
  sm: '320px',
  md: '481px',
  lg: '768px',
  xl: '1200px',
  '2xl': '1536px'
});

const theme = extendTheme({ breakpoints });

const App = ({ Component, pageProps }: AppProps): ReactElement => {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
