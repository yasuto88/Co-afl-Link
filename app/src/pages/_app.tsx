import Layout from "@/components/layout";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot, useRecoilValue } from "recoil";
import { CssVarsProvider } from "@mui/joy/styles";
import { useEffect } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <RecoilRoot>
      <CssVarsProvider defaultMode="light">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CssVarsProvider>
    </RecoilRoot>
  );
}

export default MyApp;
