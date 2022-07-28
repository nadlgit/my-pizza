import 'shared/styles/globals.css';
import type { AppProps } from 'next/app';
import { Layout } from 'shared/components/layout';
import { OrderProvider } from 'data/order';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <OrderProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </OrderProvider>
  );
};

export default MyApp;
