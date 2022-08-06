import type { NextPage } from 'next';
import { AppPage } from 'shared/components/app-page';
import { Order } from 'features/order';

const OrderPage: NextPage = () => {
  const title = 'My Pizza - Commander';
  const description = "Simulation d'un site de commande de pizza";
  return (
    <AppPage title={title} description={description}>
      <Order step="start" />
    </AppPage>
  );
};

export default OrderPage;
