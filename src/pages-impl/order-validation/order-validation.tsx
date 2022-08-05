import styles from './order-validation.module.css';
import { useOrder } from 'data/order';
import { Actions } from './actions';
import { useRouter } from 'next/router';

import type { FormEventHandler } from 'react';

export const OrderValidation = () => {
  const router = useRouter();
  const { order, cancelOrder, completeOrder } = useOrder();
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
      <Actions onCancel={handleCancel} onBack={handleBack} submitDisabled={true} />
    </form>
  );
};
