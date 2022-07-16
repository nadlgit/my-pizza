import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>My Pizza</title>
        <meta name="description" content="Simulation d'un site de commande de pizza" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>My pizza</h1>
      </main>
    </div>
  );
};

export default Home;
