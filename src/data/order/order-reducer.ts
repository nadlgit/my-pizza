import { DEFAULT_ORDER } from './default-order';
import { updateOrderAmount, newOrderId } from './helpers';

import type { Order } from 'data/model';

type OrderReducerAction =
  | {
      type: 'SET_BASE';
      payload: Pick<Order, 'base'>;
    }
  | {
      type: 'SET_INGREDIENTS';
      payload: Pick<Order, 'ingredients'>;
    }
  | {
      type: 'SET_DELIVERY';
      payload: Pick<Order, 'deliveryMode'>;
    }
  | {
      type: 'SET_CONTACT';
      payload: Pick<Order, 'contact'>;
    }
  | {
      type: 'COMPLETE';
    }
  | {
      type: 'CANCEL';
    };

export const orderReducer = (state: Order, action: OrderReducerAction) => {
  switch (action.type) {
    case 'SET_BASE':
      return updateOrderAmount({ ...state, base: action.payload.base });
    case 'SET_INGREDIENTS':
      return updateOrderAmount({ ...state, ingredients: action.payload.ingredients });
    case 'SET_DELIVERY':
      return updateOrderAmount({ ...state, deliveryMode: action.payload.deliveryMode });
    case 'SET_CONTACT':
      return { ...state, contact: action.payload.contact };
    case 'COMPLETE':
      return { ...state, id: newOrderId() };
    case 'CANCEL':
      return DEFAULT_ORDER;
  }
};
