import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

import { titleFont } from "~/shared/fonts";

interface Link {
  url: string;
}

interface LinksData {
  links: Link[];
}

const FeelingLucky: NextPage = () => {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getRandomLink = async (): Promise<string> => {
    try {
      // Fetch the links.json file
      const response = await fetch("/feelinglucky/links.json");
      if (!response.ok) {
        throw new Error("Failed to fetch links");
      }

      const data = (await response.json()) as LinksData;
      const links = data.links;

      if (links.length === 0) {
        throw new Error("No links available");
      }

      // Get a random link
      const randomIndex = Math.floor(Math.random() * links.length);
      const randomLink = links[randomIndex];
      if (!randomLink) {
        throw new Error("Failed to select random link");
      }
      let url = randomLink.url;

      // Check if it's a PDF and add random page parameter
      if (url.toLowerCase().endsWith(".pdf")) {
        // Generate a random page number between 1 and 100
        // Most PDFs should have at least a few pages, and browsers will handle invalid page numbers gracefully
        const randomPage = Math.floor(Math.random() * 100) + 1;
        url += `#page=${randomPage}`;
      }

      return url;
    } catch (err) {
      throw new Error(
        err instanceof Error ? err.message : "Unknown error occurred"
      );
    }
  };

  const handleFeelingLucky = () => {
    void (async () => {
      setIsRedirecting(true);
      setError(null);

      try {
        const randomUrl = await getRandomLink();
        // Open in new tab/window
        window.open(randomUrl, "_blank", "noopener,noreferrer");
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to get random link"
        );
      } finally {
        setIsRedirecting(false);
      }
    })();
  };

  return (
    <>
      <Head>
        <title>Feeling Lucky | Onkar Deshpande</title>
        <meta
          name="description"
          content="Take me to a random interesting link!"
        />
      </Head>
      <div className="flex w-full max-w-2xl flex-col place-items-center p-10 text-center">
        <h1 className={"mb-8 text-6xl text-main lg:text-7xl" + titleFont}>
          Feeling Lucky?
        </h1>

        {isRedirecting && (
          <div className="mb-6">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-main"></div>
            <p className="text-xl">Finding something interesting for you...</p>
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-lg bg-red-100 p-4 dark:bg-red-900">
            <p className="text-red-700 dark:text-red-300">Error: {error}</p>
          </div>
        )}

        <div className="space-y-4">
          <p className="text-lg">
            Click the button below to be taken to a random interesting link!
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            If it&apos;s a PDF, you&apos;ll be taken to a random page within it.
          </p>

          <button
            onClick={handleFeelingLucky}
            disabled={isRedirecting}
            className="rounded-lg bg-main px-8 py-3 text-lg font-semibold text-white transition-all duration-200 hover:bg-opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isRedirecting ? "Finding..." : "I'm Feeling Lucky!"}
          </button>
        </div>
      </div>
    </>
  );
};

export default FeelingLucky;
