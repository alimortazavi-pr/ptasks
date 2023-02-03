import { ColorModeScript } from "@chakra-ui/react";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ar" dir="rtl" data-theme="light" className="light bg-gray-100">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="apple-touch-icon"
          href="/assets/icons/apple-touch-icon.png"
        ></link>
        <meta name="theme-color" content="#A78BFA" />
        <meta
          name="description"
          content="Powered by paradise-code created by alimortazavi.org"
        ></meta>
        <meta name="author" content="alimortazavi.org"></meta>
      </Head>
      <body className="bg-gray-100">
        <ColorModeScript initialColorMode={"light"} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
