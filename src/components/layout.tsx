import "@theme-toggles/react/css/Expand.css";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { type PropsWithChildren } from "react";
import { Caveat } from "next/font/google";
import { useRouter } from "next/router";
import { Expand } from "@theme-toggles/react";
import { useTheme } from "next-themes";
const commonFont = Caveat({ subsets: ["latin"] });

export default function Layout({ children }: PropsWithChildren) {
  const { status } = useSession();
  const { asPath } = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const page = asPath.split("/")[1];
  return (
    <div
      className={
        "flex h-screen flex-col place-items-center " + commonFont.className
      }
    >
      <nav className="m-5 flex w-full max-w-screen-lg flex-row justify-between text-acc-dark dark:text-acc-light">
        <div className="flex flex-row gap-4 text-4xl">
          {[
            { text: "Home", path: "" },
            { text: "Musings", path: "musings" },
            { text: "Projects", path: "projects" },
          ].map(({ text, path }) => (
            <Link key={text} href={"/" + path} className="m-2">
              <div className={page == path ? "text-main" : ""}>{text}</div>
            </Link>
          ))}
        </div>
        <Expand
          duration={500}
          toggled={resolvedTheme === "dark"}
          onToggle={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className="text-4xl"
        />
      </nav>
      {status === "authenticated" && <nav>Private</nav>}
      <main>{children}</main>
    </div>
  );
}
