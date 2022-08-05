import type { NextPage } from 'next';
import { AppPage } from 'shared/components/app-page';
import { OrderValidation } from 'pages-impl/order-validation';

const OrderValidationPage: NextPage = () => {
  const title = 'My Pizza - Commander';
  const description = "Simulation d'un site de commande de pizza";
  return (
    <AppPage title={title} description={description}>
      <OrderValidation />
    </AppPage>
  );
};

export default OrderValidationPage;
