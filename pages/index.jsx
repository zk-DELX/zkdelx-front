import Head from "next/head";
import Navbar from "../components/Navbar";
import Core from "../components/Core/Core";

const Home = () => {
  return (
    <div>
      <Head ssr={true}>
        <title>zk-Delx | testnet</title>
        <meta name="description" content="This is a description of zkDelx." />
        <meta name="keywords" content="zkDelx" />
        <meta name="author" content="zkDelx" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Navbar />
      <Core />
    </div>
  );
};

export default Home;
