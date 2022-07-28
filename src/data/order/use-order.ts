import { useContext } from 'react';
import { OrderContext } from './order-provider';

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within OrderContext');
  }
  return context;
};
