import { Analytics } from "@vercel/analytics/react";
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import React from "react";

import Layout from "~/shared/layout";
import "~/styles/globals.css";
import { api } from "~/utils/api";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <SessionProvider session={session}>
        <ThemeProvider storageKey="od-theme" attribute="class">
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </SessionProvider>
      <Analytics />
    </>
  );
};

export default api.withTRPC(MyApp);
