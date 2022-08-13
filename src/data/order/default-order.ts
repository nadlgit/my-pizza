import { PIZZA_BASES } from 'data/bases';
import { updateOrderAmount } from './helpers';

import type { order } from 'data/model';

export const DEFAULT_ORDER: order = Object.freeze(
  updateOrderAmount({
    id: 0,
    base: PIZZA_BASES[0],
    ingredients: [],
    amount: 0,
    amountExtraPart: 0,
    deliveryMode: 'pick-up',
  })
);
