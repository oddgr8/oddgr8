import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";

import { titleFont } from "~/shared/fonts";

function Musing() {
  return (
    <>
      {[
        {
          link: "https://youtu.be/gnUYoQ1pwes",
          content: "Why the left and right hate each other",
          author: "WhatIfAltHist",
        },
        {
          link: "https://www.rust-lang.org/learn",
          content: "Rust",
          author: "",
        },
        {
          link: "https://youtu.be/gnUYoQ1pwes",
          content: "Everything about colours",
          author: "Kuvina Saydaki",
        },
        {
          link: "https://youtu.be/ovJcsL7vyrk",
          content: "This equation will change how you see the world",
          author: "Veritasium",
        },
        {
          link: "https://kritingarg.substack.com/p/did-apple-make-your-startup-obsolete",
          content: "Did Apple make your startup obsolete?",
          author: "Kritin Garg",
        },
      ].map((ele, idx) => (
        <Link
          href={ele.link}
          key={idx}
          target="_blank"
          rel="noreferrer"
          className="my-5 w-full"
        >
          <h2 className="text-2xl">
            <FontAwesomeIcon
              className="absolute m-1 -translate-x-7 translate-y-1"
              icon={faArrowUpRightFromSquare}
              size="xs"
            />
            {ele.content}
          </h2>
          <p className="opacity-50">{ele.author}</p>
        </Link>
      ))}
    </>
  );
}

const Musings: NextPage = () => {
  return (
    <>
      <Head>
        <title>Musings | Onkar Deshpande</title>
        <meta name="description" content="Musings of Onkar Deshpande" />
      </Head>
      <div className="flex w-full max-w-2xl flex-col place-items-center p-10 text-start">
        <p className={"text-3xl lg:text-4xl" + titleFont}>Behold...</p>
        <h1 className={"text-7xl text-main lg:text-8xl" + titleFont}>
          My Stuff!
        </h1>
        <p className={"my-5"}>
          I plan to add my blog here. Until that I do that, here are some things
          I found interesting:
        </p>
        <Musing />
      </div>
    </>
  );
};

export default Musings;
