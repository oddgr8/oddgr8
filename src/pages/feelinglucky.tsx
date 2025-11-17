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
  const [info, setInfo] = useState<string | null>(null);

  // Helper function to detect browser type
  const getBrowserType = (): string => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes("safari") && !userAgent.includes("chrome")) {
      return "safari";
    } else if (userAgent.includes("chrome")) {
      return "chrome";
    } else if (userAgent.includes("firefox")) {
      return "firefox";
    } else if (userAgent.includes("edge")) {
      return "edge";
    }
    return "other";
  };

  // Helper function to add PDF page navigation based on browser
  const addPdfPageNavigation = (url: string, page: number): string => {
    const browser = getBrowserType();

    switch (browser) {
      case "safari":
        // Safari has very limited PDF fragment support
        // Try multiple approaches in order of likelihood to work:
        // 1. Standard page parameter (sometimes works)
        // 2. Adobe Reader nameddest format
        // 3. Pagemode with page parameter

        // For Safari, we'll try multiple formats and let the browser handle it
        // Most reliable approach is to try the standard format first
        const standardUrl = `${url}#page=${page}`;

        // If the standard doesn't work, Safari users will at least get the PDF
        // We could also try: `${url}#pagemode=bookmarks&page=${page}`
        // Or: `${url}#nameddest=page.${page}`
        // But the standard format is most likely to work when it does work
        return standardUrl;

      case "chrome":
      case "firefox":
      case "edge":
        // These browsers generally support the standard page parameter reliably
        return `${url}#page=${page}`;

      default:
        // For unknown browsers, try the standard approach
        return `${url}#page=${page}`;
    }
  };

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
        url = addPdfPageNavigation(url, randomPage);
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
        const browser = getBrowserType();

        // Special handling for Safari with PDFs
        if (browser === "safari" && randomUrl.toLowerCase().endsWith(".pdf")) {
          // For Safari, we'll open the PDF and show a helpful message
          window.open(randomUrl, "_blank", "noopener,noreferrer");

          // Show a brief informational message for Safari users
          setTimeout(() => {
            setInfo(
              "Note: PDF page navigation may not work in Safari. The PDF will open at the beginning."
            );
          }, 1000);

          // Clear the message after a few seconds
          setTimeout(() => {
            setInfo(null);
          }, 5000);
        } else {
          // For other browsers or non-PDF links, proceed normally
          window.open(randomUrl, "_blank", "noopener,noreferrer");
        }
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

        {info && (
          <div className="mb-6 rounded-lg bg-blue-100 p-4 dark:bg-blue-900">
            <p className="text-blue-700 dark:text-blue-300">{info}</p>
          </div>
        )}

        <div className="space-y-4">
          <p className="text-lg">
            Click the button below to be taken to a random interesting link!
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            If it&apos;s a PDF, you&apos;ll be taken to a random page within it.
            <br />
            <span className="text-xs">
              (Page navigation works reliably in Chrome, Firefox, and Edge.
              Safari may open PDFs at the beginning.)
            </span>
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
