import type { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import { ThemeProvider } from 'styled-components';

import Contexts from '../contexts';
import GlobalStyles from 'styles/global';
import theme from 'styles/theme';

export default function App({ Component, pageProps }: AppProps) {
  Router.events.on('routeChangeStart', () => NProgress.start());
  Router.events.on('routeChangeComplete', () => NProgress.done());
  Router.events.on('routeChangeError', () => NProgress.done());

  return (
    <>
      <Head>
        <title>SpendSmart</title>
        <link rel="shortcut ico" href="/img/icon-512.png" />
        <link rel="apple-touch-icon" href="/img/icon-512.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="stylesheet" type="text/css" href="/nprogress.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />

        <meta
          name="description"
          content="Um Web App de gerenciamento de finnanças."
        />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Contexts>
          <Component {...pageProps} />
        </Contexts>
      </ThemeProvider>
    </>
  );
}
