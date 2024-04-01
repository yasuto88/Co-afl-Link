import Layout from "@/components/layout";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot, useRecoilValue } from "recoil";
import { CssVarsProvider } from "@mui/joy/styles";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { loginAtom } from "@/state/atoms/auth";
import SignIn from "./SignIn";

function MyApp({ Component, pageProps,router }: AppProps) {
  return (
    <RecoilRoot>
      <CssVarsProvider defaultMode="light">
        <ProtectedComponent
          Component={Component}
          pageProps={pageProps}
          router={router}
        />
      </CssVarsProvider>
    </RecoilRoot>
  );
}

function ProtectedComponent({ Component, pageProps }: AppProps) {
  const login = useRecoilValue(loginAtom);
  const router = useRouter();

  useEffect(() => {
    // `/SignIn`ページでのリダイレクトロジックを除外
    if (!login && router.pathname !== "/SignIn") {
      router.push("/SignIn");
    } else if (login && router.pathname === "/SignIn") {
      router.push("/"); // ログイン状態でSignInページにいる場合はホームにリダイレクト
    }
  }, [login, router]);

  if (!login && router.pathname !== "/SignIn") return null; // ログインしていない状態でSignInページ以外にいる場合は何も表示しない

  return login || router.pathname !== "/SignIn" ? <Layout><Component {...pageProps} /></Layout> : <SignIn />;
}

export default MyApp;
