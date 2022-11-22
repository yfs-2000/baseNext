import Head from "next/head";
//import Script from "next/script"; 谷歌分析等需要放置在_app 中
import Content from "container/content";
import { useRouter } from "next/router";
import NProgress from "nprogress"; //全局的css样式都要放这里
import { useEffect } from "react";
import { appWithTranslation } from "next-i18next";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { Toaster } from "react-hot-toast";
import { WagmiConfig } from "wagmi";
import client from "../web3/client";
import theme from "../common/theme";

function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      NProgress.start();
    };
    const handleError = () => {
      NProgress.done();
    };
    const handleComplete = () => {
      NProgress.done();
    };
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleError);
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleError);
    };
  }, [router]);

  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ThemeProvider theme={theme}>
        <WagmiConfig client={client}>
          <CssBaseline />
          <Toaster position="top-center" />
          <Content>
            <Component {...pageProps} />
          </Content>
        </WagmiConfig>
      </ThemeProvider>
    </div>
  );
}
export default appWithTranslation(App);
