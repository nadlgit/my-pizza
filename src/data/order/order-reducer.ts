import { defaultOrder } from './constants';
import { updateOrderAmount, newOrderId } from './helpers';

import type { order } from 'data/model';

type orderReducerAction =
  | {
      type: 'SET_BASE';
      payload: Pick<order, 'base'>;
    }
  | {
      type: 'SET_INGREDIENTS';
      payload: Pick<order, 'ingredients'>;
    }
  | {
      type: 'SET_DELIVERY';
      payload: Pick<order, 'deliveryMode'>;
    }
  | {
      type: 'SET_CONTACT';
      payload: Pick<order, 'contact'>;
    }
  | {
      type: 'COMPLETE';
    }
  | {
      type: 'CANCEL';
    };

export const orderReducer = (state: order, action: orderReducerAction) => {
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
      return defaultOrder;
  }
};
