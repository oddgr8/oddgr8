import { Head, Html, Main, NextScript } from "next/document";
import React from "react";

export default function Document() {
  return (
    <Html
      lang="en"
      className="overflow-x-hidden scroll-smooth transition-colors duration-500 ease-in-out"
    >
      <Head>
        <link rel="icon" href="/Logo.png" />
      </Head>
      <body className="bg-shade-light text-center text-shade-dark transition-all duration-500 dark:bg-shade-dark dark:text-shade-light md:text-start">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
