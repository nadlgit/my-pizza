import type { NextPage } from 'next';
import { AppPage } from 'shared/components/app-page';
import { Order } from 'features/order';

const OrderValidationPage: NextPage = () => {
  const title = 'My Pizza - Commander';
  const description = "Simulation d'un site de commande de pizza";
  return (
    <AppPage title={title} description={description}>
      <Order step="validation" />
    </AppPage>
  );
};

export default OrderValidationPage;
