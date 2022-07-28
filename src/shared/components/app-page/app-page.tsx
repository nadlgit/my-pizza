import Head from 'next/head';

import type { ReactNode } from 'react';

type AppPageProps = { title: string; description: string; children: ReactNode };

export const AppPage = ({ title, description, children }: AppPageProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.png" />
      </Head>
      {children}
    </>
  );
};
