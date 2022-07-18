import type { NextPage } from 'next';
import Head from 'next/head';
import { Home } from 'pages-impl/home';

export const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>My Pizza</title>
        <meta name="description" content="Simulation d'un site de commande de pizza" />
      </Head>
      <Home />
    </>
  );
};

export default HomePage;
