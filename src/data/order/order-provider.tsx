import { createContext, useReducer } from 'react';
import { orderReducer } from './order-reducer';
import { DEFAULT_ORDER } from './constants';

import type { order } from 'data/model';
import type { ReactNode } from 'react';

type OrderContextValue = {
  order: order;
  setBase: (value: order['base']) => void;
  setIngredients: (value: order['ingredients']) => void;
  setDeliveryMode: (value: order['deliveryMode']) => void;
  setContact: (value: order['contact']) => void;
  completeOrder: () => void;
  cancelOrder: () => void;
};

type OrderProviderProps = {
  children: ReactNode;
};

export const OrderContext = createContext<OrderContextValue | undefined>(undefined);

export const OrderProvider = ({ children }: OrderProviderProps) => {
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

  return (
    <OrderContext.Provider
      value={{
        order,
        setBase,
        setIngredients,
        setDeliveryMode,
        setContact,
        completeOrder,
        cancelOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
