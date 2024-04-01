import Document, { Html, Head, Main, NextScript } from "next/document";
import { getInitColorSchemeScript } from "@mui/joy/styles";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="dns-prefetch" href="//www.google.co.jp" />
        </Head>
        <body>
          {getInitColorSchemeScript()}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
