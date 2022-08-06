import { EndSummary } from './end-summary';
import { Button } from 'shared/components/ui/button';

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
      <Button semantic="link" url="/" look="orange">
        Retour à l&apos;accueil
      </Button>
    </div>
  );
};
