import { Caveat, Montserrat } from "next/font/google";

const getFont = (font: string) => " " + font + " ";

const montserrat = Montserrat({ subsets: ["latin"] });
const caveat = Caveat({ subsets: ["latin"] });

export const commonFont = getFont(montserrat.className);
export const titleFont = getFont(caveat.className);
