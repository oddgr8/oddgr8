import { useSession } from "next-auth/react";
import Link from "next/link";
import { type PropsWithChildren } from "react";
import { Caveat } from "next/font/google";
import { useRouter } from "next/router";

const commonFont = Caveat({ subsets: ["latin"] });

export default function Layout({ children }: PropsWithChildren) {
  const { status } = useSession();
  const { asPath } = useRouter();
  const page = asPath.split("/")[1];
  return (
    <div
      className={
        "flex h-screen flex-col place-items-center " + commonFont.className
      }
    >
      <nav className="m-5 flex w-full max-w-screen-lg flex-row justify-between">
        <div className="flex flex-row gap-4 text-4xl text-acc-dark dark:text-acc-light">
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

        <div>Theme</div>
      </nav>
      {status === "authenticated" && <nav>Private</nav>}
      <main>{children}</main>
    </div>
  );
}
