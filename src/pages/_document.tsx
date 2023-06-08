import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html
      lang="en"
      className="overflow-x-hidden scroll-smooth transition-colors duration-300 ease-in-out"
    >
      <Head>
        <link rel="icon" href="/Logo.png" />
      </Head>
      <body className="bg-shade-light dark:bg-shade-dark">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
