import Head from 'next/head';

type AppPageProps = { title: string; description: string; children: React.ReactNode };

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
