import { useReducer } from 'react';
import { orderReducer } from './order-reducer';
import { DEFAULT_ORDER } from './default-order';

import type { order } from 'data/model';

export const useOrder = () => {
  const [order, dispatchOrder] = useReducer(orderReducer, DEFAULT_ORDER);

  const setBase = (value: order['base']) => {
    dispatchOrder({ type: 'SET_BASE', payload: { base: value } });
  };
  const setIngredients = (value: order['ingredients']) => {
    dispatchOrder({ type: 'SET_INGREDIENTS', payload: { ingredients: value } });
  };
  const setDeliveryMode = (value: order['deliveryMode']) => {
    dispatchOrder({ type: 'SET_DELIVERY', payload: { deliveryMode: value } });
  };
  const setContact = (value: order['contact']) => {
    dispatchOrder({ type: 'SET_CONTACT', payload: { contact: value } });
  };
  const completeOrder = () => {
    dispatchOrder({ type: 'COMPLETE' });
  };
  const cancelOrder = () => {
    dispatchOrder({ type: 'CANCEL' });
  };

  return {
    order,
    setBase,
    setIngredients,
    setDeliveryMode,
    setContact,
    completeOrder,
    cancelOrder,
  };
};
