import { bases } from 'data/bases';
import { updateOrderAmount } from './helpers';

import type { order } from 'data/model';

export const deliveryExtraCharge = 5;

export const defaultOrder: order = Object.freeze(
  updateOrderAmount({
    id: 0,
    base: bases[0],
    ingredients: [],
    amount: 0,
    amountExtraPart: 0,
    deliveryMode: 'pick-up',
  })
);
