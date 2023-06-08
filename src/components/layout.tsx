import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { type PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  const { status } = useSession();
  return (
    <div className="flex h-screen flex-col place-items-center ">
      <nav className="m-5 flex w-full max-w-screen-xl flex-row justify-between">
        <Link href="/">
          <Image src="/OD text.png" width="100" height="100" alt="Home" />
        </Link>
        <Link href="/musings">
          <Image
            src="/thought bubble.png"
            width="100"
            height="100"
            alt="Musings"
          />
        </Link>
      </nav>
      {status === "authenticated" && <nav>Private</nav>}
      <main>{children}</main>
    </div>
  );
}
