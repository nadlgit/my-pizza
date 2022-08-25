import styles from './order.module.css';
import { OrderStart } from './order-start';
import { OrderValidation } from './order-validation';
import { OrderEnd } from './order-end';
import { useOrder } from 'data/order';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import type { FormEventHandler } from 'react';

type OrderStep = 'start' | 'validation' | 'end';
const orderStepList = ['start', 'validation', 'end'] as OrderStep[];
const firstStep = orderStepList[0];
const prevStep = (step: OrderStep) => {
  const stepIndex = orderStepList.findIndex((item) => item === step);
  if (stepIndex > 0 && stepIndex <= orderStepList.length) {
    return orderStepList[stepIndex - 1];
  } else {
    return step;
  }
};
const nextStep = (step: OrderStep) => {
  const stepIndex = orderStepList.findIndex((item) => item === step);
  if (stepIndex >= 0 && stepIndex < orderStepList.length) {
    return orderStepList[stepIndex + 1];
  } else {
    return step;
  }
};

export const Order = () => {
  const [step, setStep] = useState<OrderStep>(firstStep);
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

  useEffect(() => {
    setStep(firstStep);
    return () => cancelOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCancel = () => {
    cancelOrder();
    router.push('/');
  };

  const handleBack = () => {
    setStep(prevStep(step));
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (step === 'validation') {
      completeOrder();
    }
    setStep(nextStep(step));
  };

  const baseClassName = styles.container;
  return (
    <>
      {step === 'start' && (
        <OrderStart
          order={order}
          setBase={setBase}
          setIngredients={setIngredients}
          handleCancel={handleCancel}
          handleFormSubmit={handleFormSubmit}
          className={`${baseClassName} ${styles.start}`}
        />
      )}
      {step === 'validation' && (
        <OrderValidation
          order={order}
          setDeliveryMode={setDeliveryMode}
          setContact={setContact}
          handleCancel={handleCancel}
          handleBack={handleBack}
          handleFormSubmit={handleFormSubmit}
          className={`${baseClassName} ${styles.validation}`}
        />
      )}
      {step === 'end' && <OrderEnd order={order} className={baseClassName} />}
    </>
  );
};
