import 'shared/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Layout } from 'shared/components/layout';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default MyApp;
