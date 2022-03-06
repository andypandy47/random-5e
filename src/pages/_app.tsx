import { AppProps } from 'next/app';
import '../styles/index.css';
import { ReactElement } from 'react';

const App = ({ Component, pageProps }: AppProps): ReactElement => {
  return <Component {...pageProps} />;
};

export default App;
