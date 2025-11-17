import { Head, Html, Main, NextScript } from "next/document";
import React from "react";

export default function Document() {
  return (
    <Html
      lang="en"
      className="overflow-x-hidden scroll-smooth transition-colors duration-500 ease-in-out"
    >
      <Head>
        {/* Standard favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />

        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Safari Pinned Tab */}
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />

        {/* Microsoft Tiles */}
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Theme colors */}
        <meta name="theme-color" content="#000000" />
      </Head>
      <body className="bg-shade-light text-center text-shade-dark transition-all duration-500 dark:bg-shade-dark dark:text-shade-light md:text-start">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
