import { deliveryExtraCharge } from './constants';

import type { order } from 'data/model';

export const updateOrderAmount = (order: order): order => ({
  ...order,
  amount:
    order.base.price +
    order.ingredients.reduce((previous, current) => previous + current.price, 0) +
    (order.deliveryMode === 'delivery' ? deliveryExtraCharge : 0),
});

export const newOrderId = () => Date.now();
