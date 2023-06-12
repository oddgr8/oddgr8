import "@theme-toggles/react/css/Expand.css";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { type PropsWithChildren } from "react";
import { useRouter } from "next/router";
import { Expand } from "@theme-toggles/react";
import { useTheme } from "next-themes";
import { commonFont, titleFont } from "./fonts";

export default function Layout({ children }: PropsWithChildren) {
  const { status } = useSession();
  const { asPath } = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const page = asPath.split("/")[1];
  return (
    <div className={"flex w-full flex-col place-items-center" + commonFont}>
      <div className="flex h-screen w-full max-w-screen-2xl flex-col items-center">
        <nav
          className={
            "flex w-full flex-row justify-between p-2 text-acc-dark dark:text-acc-light md:p-5 md:px-10 " +
            titleFont
          }
        >
          <div className="flex flex-row gap-4 text-4xl">
            {[
              { text: "Home", path: "" },
              { text: "Musings", path: "musings" },
            ].map(({ text, path }) => (
              <Link key={text} href={"/" + path} className="m-2">
                <div className={page == path ? "text-main" : ""}>{text}</div>
              </Link>
            ))}
          </div>
          <Expand
            duration={500}
            toggled={resolvedTheme === "dark"}
            onToggle={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            className="text-4xl"
          />
        </nav>
        {status === "authenticated" && <nav>Private</nav>}
        <main className="flex w-full flex-col place-items-center">
          {children}
        </main>
      </div>
    </div>
  );
}
