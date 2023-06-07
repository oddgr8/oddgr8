module.exports = {
  // this will check Typescript files
  "**/*.(ts|tsx)": () => "pnpm tsc --noEmit",

  // This will lint and format TypeScript and
  // JavaScript files
  // @ts-ignore
  "**/*.(ts|tsx|js)": (filenames) => [
    `pnpm eslint --fix ${filenames.join(" ")}`,
    `pnpm prettier --write ${filenames.join(" ")}`,
  ],

  // this will Format MarkDown and JSON
  // @ts-ignore
  "**/*.(md|json)": (filenames) =>
    `pnpm prettier --write ${filenames.join(" ")}`,
};
