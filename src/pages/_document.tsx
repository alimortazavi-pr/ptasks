import { ColorModeScript } from "@chakra-ui/react";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ar" dir="rtl" data-theme="light" className="light bg-gray-100">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png"></link>
        <meta name="theme-color" content="#AC6DDE" />
        <meta
          name="description"
          content="Powered by paradise-code created by alimortazavimanesh.ir"
        ></meta>
        <meta name="author" content="alimortazavimanesh.ir"></meta>
      </Head>
      <body className="bg-gray-100">
        <ColorModeScript initialColorMode={"light"} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
