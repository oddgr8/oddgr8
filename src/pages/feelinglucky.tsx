import { type NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";

import { titleFont } from "~/shared/fonts";

interface Link {
  url: string;
  category: string;
}

interface Categories {
  [key: string]: Categories | Record<string, never>;
}

interface LinksData {
  categories: Categories;
  links: Link[];
}

const FeelingLucky: NextPage = () => {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [isSafari, setIsSafari] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set()
  );
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [linksData, setLinksData] = useState<LinksData | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );

  // Effect to detect browser type on client side
  useEffect(() => {
    setIsClient(true);
    const userAgent = navigator.userAgent.toLowerCase();
    setIsSafari(userAgent.includes("safari") && !userAgent.includes("chrome"));
  }, []);

  // Effect to load links data and extract categories
  useEffect(() => {
    const loadLinksData = async () => {
      try {
        const response = await fetch("/feelinglucky/links.json");
        if (!response.ok) {
          throw new Error("Failed to fetch links");
        }
        const data = (await response.json()) as LinksData;
        setLinksData(data);

        // Extract all unique categories from links
        const categories = Array.from(
          new Set(data.links.map((link) => link.category))
        );
        setAvailableCategories(categories.sort());

        // Initially select all categories
        setSelectedCategories(new Set(categories));

        // Initially expand all parent categories
        const getAllParentCategories = (
          cats: Categories,
          parents: Set<string> = new Set()
        ): Set<string> => {
          for (const [key, value] of Object.entries(cats)) {
            if (typeof value === "object" && Object.keys(value).length > 0) {
              parents.add(key);
              getAllParentCategories(value as Categories, parents);
            }
          }
          return parents;
        };

        setExpandedCategories(getAllParentCategories(data.categories));
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load categories"
        );
      }
    };

    void loadLinksData();
  }, []);

  // Helper functions for category management
  const toggleCategory = (category: string) => {
    const newSelected = new Set(selectedCategories);
    if (newSelected.has(category)) {
      newSelected.delete(category);
    } else {
      newSelected.add(category);
    }
    setSelectedCategories(newSelected);
  };

  // Get all leaf categories (categories that have links) under a parent category
  const getAllLeafCategories = (
    categories: Categories,
    parentKey?: string
  ): string[] => {
    const leafCategories: string[] = [];

    const traverse = (cats: Categories) => {
      for (const [key, value] of Object.entries(cats)) {
        if (availableCategories.includes(key)) {
          leafCategories.push(key);
        }
        if (
          typeof value === "object" &&
          value !== null &&
          Object.keys(value).length > 0
        ) {
          traverse(value as Categories);
        }
      }
    };

    if (parentKey && categories[parentKey]) {
      traverse(categories[parentKey] as Categories);
    } else {
      traverse(categories);
    }

    return leafCategories;
  };

  // Toggle all leaf categories under a parent category
  const toggleParentCategory = (parentKey: string) => {
    if (!linksData) return;

    const leafCategories = getAllLeafCategories(
      linksData.categories,
      parentKey
    );
    const newSelected = new Set(selectedCategories);

    // Check if all leaf categories are selected
    const allSelected = leafCategories.every((cat) => newSelected.has(cat));

    if (allSelected) {
      // Deselect all leaf categories
      leafCategories.forEach((cat) => newSelected.delete(cat));
    } else {
      // Select all leaf categories
      leafCategories.forEach((cat) => newSelected.add(cat));
    }

    setSelectedCategories(newSelected);
  };

  // Check if a parent category is fully selected (all its leaf categories are selected)
  const isParentCategorySelected = (parentKey: string): boolean => {
    if (!linksData) return false;

    const leafCategories = getAllLeafCategories(
      linksData.categories,
      parentKey
    );
    return (
      leafCategories.length > 0 &&
      leafCategories.every((cat) => selectedCategories.has(cat))
    );
  };

  // Check if a parent category is partially selected (some but not all leaf categories are selected)
  const isParentCategoryPartiallySelected = (parentKey: string): boolean => {
    if (!linksData) return false;

    const leafCategories = getAllLeafCategories(
      linksData.categories,
      parentKey
    );
    const selectedCount = leafCategories.filter((cat) =>
      selectedCategories.has(cat)
    ).length;
    return selectedCount > 0 && selectedCount < leafCategories.length;
  };

  // Toggle expanded state of a category
  const toggleCategoryExpansion = (categoryKey: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryKey)) {
      newExpanded.delete(categoryKey);
    } else {
      newExpanded.add(categoryKey);
    }
    setExpandedCategories(newExpanded);
  };

  // Recursive component to render category cards
  const CategoryTreeNode = ({
    categoryKey,
    categoryValue,
    level = 0,
  }: {
    categoryKey: string;
    categoryValue: Categories | Record<string, never>;
    level?: number;
  }) => {
    const isLeafCategory = availableCategories.includes(categoryKey);
    const hasChildren =
      typeof categoryValue === "object" &&
      Object.keys(categoryValue).length > 0;
    const isExpanded = expandedCategories.has(categoryKey);

    if (isLeafCategory) {
      // This is a leaf category (has actual links)
      const isSelected = selectedCategories.has(categoryKey);

      return (
        <div
          key={categoryKey}
          className={`rounded-lg border-2 p-3 transition-all duration-200 ${
            isSelected
              ? "border-main bg-main bg-opacity-10 shadow-md"
              : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600"
          }`}
        >
          <label className="flex cursor-pointer items-center space-x-3">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => toggleCategory(categoryKey)}
              className="h-4 w-4 rounded text-main focus:ring-main"
            />
            <span
              className={`text-sm font-medium ${
                isSelected ? "text-main" : "text-gray-700 dark:text-gray-300"
              }`}
            >
              {categoryKey}
            </span>
          </label>
        </div>
      );
    } else if (hasChildren) {
      // This is a parent category
      const isFullySelected = isParentCategorySelected(categoryKey);
      const isPartiallySelected =
        isParentCategoryPartiallySelected(categoryKey);

      return (
        <div
          key={categoryKey}
          className={`rounded-lg border-2 p-4 transition-all duration-200 ${
            isFullySelected
              ? "border-main bg-main bg-opacity-5 shadow-lg"
              : isPartiallySelected
              ? "border-yellow-400 bg-yellow-50 shadow-md dark:bg-yellow-900 dark:bg-opacity-20"
              : "border-gray-300 bg-gray-50 hover:border-gray-400 hover:shadow-sm dark:border-gray-600 dark:bg-gray-900 dark:hover:border-gray-500"
          }`}
        >
          {/* Parent category header */}
          <div className="mb-3 flex items-center justify-between">
            <label className="flex flex-1 cursor-pointer items-center space-x-3">
              <input
                type="checkbox"
                checked={isFullySelected}
                ref={(input) => {
                  if (input)
                    input.indeterminate =
                      isPartiallySelected && !isFullySelected;
                }}
                onChange={() => toggleParentCategory(categoryKey)}
                className="h-4 w-4 rounded text-main focus:ring-main"
              />
              <span
                className={`text-base font-bold ${
                  isFullySelected
                    ? "text-main"
                    : isPartiallySelected
                    ? "text-yellow-600 dark:text-yellow-400"
                    : "text-gray-800 dark:text-gray-200"
                }`}
              >
                {categoryKey}
              </span>
            </label>

            {/* Expand/Collapse button */}
            <button
              onClick={() => toggleCategoryExpansion(categoryKey)}
              className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                isExpanded
                  ? "bg-main bg-opacity-20 text-main hover:bg-opacity-30"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
              }`}
            >
              {isExpanded ? (
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              ) : (
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Children cards (only show if expanded) */}
          {isExpanded && (
            <div className="space-y-3 pl-2">
              {Object.entries(categoryValue as Categories).map(
                ([childKey, childValue]) => (
                  <CategoryTreeNode
                    key={childKey}
                    categoryKey={childKey}
                    categoryValue={childValue}
                    level={level + 1}
                  />
                )
              )}
            </div>
          )}
        </div>
      );
    }

    return null;
  };

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

  const getRandomLink = (): string => {
    if (!linksData) {
      throw new Error("Links data not loaded");
    }

    // Filter links based on selected categories
    const filteredLinks = linksData.links.filter((link) =>
      selectedCategories.has(link.category)
    );

    if (filteredLinks.length === 0) {
      throw new Error("No links available for selected categories");
    }

    // Get a random link from filtered results
    const randomIndex = Math.floor(Math.random() * filteredLinks.length);
    const randomLink = filteredLinks[randomIndex];
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
  };

  const handleFeelingLucky = () => {
    setIsRedirecting(true);
    setError(null);

    try {
      const randomUrl = getRandomLink();
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

        <div className="space-y-6">
          <p className="text-lg">
            Select categories and click the button to be taken to a random
            interesting link!
          </p>

          {/* Category Selection Cards */}
          {linksData && availableCategories.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-center text-lg font-semibold">Categories:</h3>

              <div className="mx-auto max-w-2xl space-y-4">
                {Object.entries(linksData.categories).map(
                  ([categoryKey, categoryValue]) => (
                    <CategoryTreeNode
                      key={categoryKey}
                      categoryKey={categoryKey}
                      categoryValue={categoryValue}
                    />
                  )
                )}
              </div>

              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                {selectedCategories.size} of {availableCategories.length}{" "}
                categories selected
              </p>
            </div>
          )}

          <p className="text-sm text-gray-600 dark:text-gray-400">
            If it&apos;s a PDF, you&apos;ll be taken to a random page within it.
            <br />
            {isClient && isSafari && (
              <span className="text-xs">
                (Page navigation works reliably in Chrome, Firefox, and Edge.
                Safari may open PDFs at the beginning.)
              </span>
            )}
          </p>

          <button
            onClick={handleFeelingLucky}
            disabled={isRedirecting || selectedCategories.size === 0}
            className="rounded-lg bg-main px-8 py-3 text-lg font-semibold text-white transition-all duration-200 hover:bg-opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isRedirecting ? "Finding..." : "I'm Feeling Lucky!"}
          </button>

          {selectedCategories.size === 0 && (
            <p className="text-sm text-red-600 dark:text-red-400">
              Please select at least one category to continue.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default FeelingLucky;
