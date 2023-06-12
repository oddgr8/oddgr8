import "@theme-toggles/react/css/Expand.css";
import { Expand } from "@theme-toggles/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { type PropsWithChildren } from "react";

import { commonFont, titleFont } from "./fonts";
import { isAuthorized } from "./users";

function Themer() {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <Expand
      duration={500}
      toggled={resolvedTheme === "dark"}
      onToggle={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="text-4xl"
    />
  );
}

function Navbar({
  links,
  priv,
  withThemer,
}: {
  links: { text: string; subroot: string }[];
  priv?: boolean;
  withThemer?: boolean;
}) {
  const { asPath } = useRouter();
  const { status, data } = useSession();
  if (priv)
    if (status !== "authenticated" || !isAuthorized(data.user.email ?? ""))
      return null;
  const page = asPath.split("/")[1];
  return (
    <nav
      className={
        "flex w-full flex-row justify-between p-2 text-acc-dark dark:text-acc-light md:px-10 md:pt-5 " +
        titleFont
      }
    >
      <div className="flex flex-row gap-4 text-4xl">
        {links.map(({ text, subroot }) => (
          <Link key={text} href={"/" + subroot} className="m-2">
            <div className={page == subroot ? "text-main" : ""}>{text}</div>
          </Link>
        ))}
      </div>
      {withThemer && <Themer />}
    </nav>
  );
}

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className={"flex w-full flex-col place-items-center" + commonFont}>
      <div className="flex h-screen w-full max-w-screen-2xl flex-col items-center">
        <Navbar
          withThemer
          links={[
            { text: "Home", subroot: "" },
            { text: "Musings", subroot: "musings" },
          ]}
        />
        <Navbar priv links={[{ text: "Expenses", subroot: "expenses" }]} />
        <main className="flex w-full flex-col place-items-center">
          {children}
        </main>
      </div>
    </div>
  );
}
