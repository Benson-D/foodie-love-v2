import Head from "next/head";
import { type AppType, type AppProps } from "next/app";

import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter';
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from '@mui/material/styles';

import { api } from "~/utils/api";

import "~/styles/globals.css";
import "@uploadthing/react/styles.css";
import { CssBaseline } from "@mui/material";
import theme from "~/styles/theme";

import NavBar from "~/features/navBar/NavBar";

const MyApp: AppType = (props: AppProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { Component, pageProps } = props;

  return (
    <ClerkProvider {...pageProps}>
      <AppCacheProvider {...props}>
        <Head>
          <title>Foodie Love</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <NavBar />
          <Component {...pageProps} />
        </ThemeProvider>
      </AppCacheProvider>
    </ClerkProvider>
    );
};

export default api.withTRPC(MyApp);