import { defaultOrder } from './constants';
import { updateOrderAmount, newOrderId } from './helpers';

import type { order } from 'data/model';

type orderReducerAction = {
  type: 'SET_BASE' | 'SET_INGREDIENTS' | 'SET_DELIVERY' | 'SET_CONTACT' | 'COMPLETE' | 'CANCEL';
  payload?: Partial<order>;
};

export const orderReducer = (state: order, action: orderReducerAction) => {
  switch (action.type) {
    case 'SET_BASE':
      return action.payload?.base
        ? updateOrderAmount({ ...state, base: action.payload.base })
        : state;
    case 'SET_INGREDIENTS':
      return action.payload?.ingredients
        ? updateOrderAmount({ ...state, ingredients: action.payload.ingredients })
        : state;
    case 'SET_DELIVERY':
      return action.payload?.deliveryMode
        ? updateOrderAmount({ ...state, deliveryMode: action.payload.deliveryMode })
        : state;
    case 'SET_CONTACT':
      return action.payload?.contact ? { ...state, contact: action.payload.contact } : state;
    case 'COMPLETE':
      return { ...state, id: newOrderId() };
    case 'CANCEL':
      return defaultOrder;
    default:
      throw new Error(`orderReducer unknown action type: ${action.type}`);
  }
};
