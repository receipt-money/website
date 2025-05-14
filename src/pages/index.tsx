import type { NextPage } from "next";
import Head from "next/head";
import { HomeView } from "../views";

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>receipt.money</title>
        <meta
          name="description"
          content="Liquid Restaking and dual-yield protocol on Solana"
        />
      </Head>
      <HomeView />
    </div>
  );
};

export default Home;
