import { Actions } from './actions';
import { Delivery } from './delivery';
import { Summary } from './summary';
import { useState } from 'react';

import type { order } from 'data/model';
import type { handleDeliveryModeChange } from './delivery';
import type { FormEventHandler } from 'react';

type OrderValidationProps = {
  order: order;
  setDeliveryMode: (value: order['deliveryMode']) => void;
  openContactForm: () => void;
  handleCancel: () => void;
  handleBack: () => void;
  handleFormSubmit: FormEventHandler<HTMLFormElement>;
  className: string;
};

export const OrderValidation = ({
  order,
  setDeliveryMode,
  openContactForm,
  handleCancel,
  handleBack,
  handleFormSubmit,
  className,
}: OrderValidationProps) => {
  const shoudDisableSubmit = (currentOrder: order) =>
    currentOrder.deliveryMode !== 'pick-up' && !currentOrder?.contact;

  const [submitDisabled, setSubmitDisabled] = useState(shoudDisableSubmit(order));

  const handleDeliverySelection: handleDeliveryModeChange = (current) => {
    setSubmitDisabled(shoudDisableSubmit({ ...order, deliveryMode: current }));
    setDeliveryMode(current);
  };

  return (
    <form onSubmit={handleFormSubmit} className={className}>
      <Delivery
        defaultSelection={order.deliveryMode}
        contact={order?.contact}
        onChange={handleDeliverySelection}
        openContactForm={openContactForm}
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