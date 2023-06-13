import { type NextPage } from "next";
import Head from "next/head";

const Expenses: NextPage = () => {
  return (
    <>
      <Head>
        <title>Expenses | Onkar Deshpande</title>
        <meta
          name="description"
          content="Expense tracking of Onkar Deshpande"
        />
      </Head>
      <div className="flex w-full flex-col place-items-center justify-around p-10 md:flex-row">
        Expenses
      </div>
    </>
  );
};

export default Expenses;
