import { Actions } from './actions';
import { EndSummary } from './end-summary';

import type { order } from 'data/model';

type OrderEndProps = {
  order: order;
  className: string;
};

export const OrderEnd = ({ order, className }: OrderEndProps) => {
  return (
    <div className={className}>
      <EndSummary
        id={order.id}
        deliveryMode={order.deliveryMode}
        contact={order?.contact}
        amount={order.amount}
      />
      <Actions home={{ label: "Retour à l'accueil" }} />
    </div>
  );
};
