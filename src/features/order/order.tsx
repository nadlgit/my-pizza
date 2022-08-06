import styles from './order.module.css';
import { OrderStart } from './order-start';
import { OrderValidation } from './order-validation';
import { useOrder } from 'data/order';
import { useRouter } from 'next/router';

import type { FormEventHandler } from 'react';

type OrderProps = {
  step: 'start' | 'validation';
};

const tmpOpenCOntactForm = () => {};

export const Order = ({ step }: OrderProps) => {
  const router = useRouter();
  const {
    order,
    setBase,
    setIngredients,
    setDeliveryMode,
    setContact,
    completeOrder,
    cancelOrder,
  } = useOrder();

  const handleCancel = () => {
    cancelOrder();
    router.push('/');
  };

  const handleBack = () => {
    router.back();
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    switch (step) {
      case 'start':
        router.push('/order-validation');
        break;
      case 'validation':
        //validate user input: canCompleteOrder()
        completeOrder();
        //navigate to recap
        break;
    }
  };

  return (
    <>
      {step === 'start' && (
        <OrderStart
          order={order}
          setBase={setBase}
          setIngredients={setIngredients}
          handleCancel={handleCancel}
          handleFormSubmit={handleFormSubmit}
          className={`${styles.container} ${styles.start}`}
        />
      )}
      {step === 'validation' && (
        <OrderValidation
          order={order}
          setDeliveryMode={setDeliveryMode}
          openContactForm={tmpOpenCOntactForm}
          handleCancel={handleCancel}
          handleBack={handleBack}
          handleFormSubmit={handleFormSubmit}
          className={`${styles.container} ${styles.validation}`}
        />
      )}
    </>
  );
};
