import { Actions } from './actions';
import { Delivery } from './delivery';
import { Summary } from './summary';
import { useState } from 'react';

import type { Order } from 'data/model';
import type { HandleDeliveryModeChange } from './delivery';
import type { HandleContactChange } from './delivery';
import type { FormEventHandler } from 'react';

type OrderValidationProps = {
  order: Order;
  setDeliveryMode: (value: Order['deliveryMode']) => void;
  setContact: (value: Order['contact']) => void;
  handleCancel: () => void;
  handleBack: () => void;
  handleFormSubmit: FormEventHandler<HTMLFormElement>;
  className: string;
};

export const OrderValidation = ({
  order,
  setDeliveryMode,
  setContact,
  handleCancel,
  handleBack,
  handleFormSubmit,
  className,
}: OrderValidationProps) => {
  const shoudDisableSubmit = (currentOrder: Order) =>
    currentOrder.deliveryMode !== 'pick-up' && !currentOrder?.contact;

  const [submitDisabled, setSubmitDisabled] = useState(shoudDisableSubmit(order));

  const handleDeliverySelection: HandleDeliveryModeChange = (current) => {
    setSubmitDisabled(shoudDisableSubmit({ ...order, deliveryMode: current }));
    setDeliveryMode(current);
  };

  const handleContactChange: HandleContactChange = (current) => {
    setSubmitDisabled(shoudDisableSubmit({ ...order, contact: current }));
    setContact(current);
  };

  return (
    <form onSubmit={handleFormSubmit} className={className}>
      <Delivery
        defaultSelection={order.deliveryMode}
        contact={order?.contact}
        onModeChange={handleDeliverySelection}
        onContactChange={handleContactChange}
      />
      <Summary
        amount={order.amount}
        base={order.base}
        ingredients={order.ingredients}
        deliveryMode={order.deliveryMode}
      />
      <Actions
        cancel={{ label: 'Annuler', onClick: handleCancel }}
        submit={{ label: 'Valider', disabled: submitDisabled }}
        back={{ label: 'Retour', onClick: handleBack }}
      />
    </form>
  );
};
