import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html
      lang="en"
      className="overflow-x-hidden scroll-smooth transition-colors duration-500 ease-in-out"
    >
      <Head>
        <link rel="icon" href="/Logo.png" />
        <title>Onkar Deshpande</title>
        <meta name="description" content="Homepage for Onkar Deshpande" />
      </Head>
      <body className="bg-shade-light text-center text-shade-dark transition-all duration-500 dark:bg-shade-dark dark:text-shade-light md:text-start">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
