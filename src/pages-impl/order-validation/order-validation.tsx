import styles from './order-validation.module.css';
import { useOrder } from 'data/order';
import { Delivery } from './delivery';
import { Actions } from './actions';
import { useRouter } from 'next/router';
import { useState } from 'react';

import type { FormEventHandler } from 'react';
import type { order } from 'data/model';
import type { handleDeliveryModeChange } from './delivery';

export const OrderValidation = () => {
  const router = useRouter();
  const { order, cancelOrder, completeOrder, setDeliveryMode, setContact } = useOrder();
  const [submitDisabled, setSubmitDisabled] = useState(order.deliveryMode !== 'pick-up');
  const validate = (currentOrder: order) => {
    // to update with contact validation
    const isValid = currentOrder.deliveryMode === 'pick-up';
    setSubmitDisabled(!isValid);
  };
  const handleDeliveryModeChange: handleDeliveryModeChange = (current) => {
    validate({ ...order, deliveryMode: current });
    setDeliveryMode(current);
  };
  const handleCancel = () => {
    cancelOrder();
    router.push('/');
  };
  const handleBack = () => {
    router.back();
  };
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    //validate user input
    completeOrder();
    //navigate to recap
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <Delivery
        defaultSelection={order.deliveryMode}
        contact={order?.contact}
        onChange={handleDeliveryModeChange}
        openContactForm={() => {}}
      />
      <Actions onCancel={handleCancel} onBack={handleBack} submitDisabled={submitDisabled} />
    </form>
  );
};
