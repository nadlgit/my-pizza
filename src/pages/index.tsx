import type { NextPage } from 'next';
import { AppPage } from 'shared/components/app-page';
import { Home } from 'pages-impl/home';

const HomePage: NextPage = () => {
  const title = 'My Pizza';
  const description = "Simulation d'un site de commande de pizza";
  return (
    <AppPage title={title} description={description}>
      <Home />
    </AppPage>
  );
};

export default HomePage;
