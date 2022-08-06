import { deliveryExtraCharge } from './constants';

import type { order } from 'data/model';

export const updateOrderAmount = (order: order): order => {
  const amoutWithoutExtra =
    order.base.price + order.ingredients.reduce((previous, current) => previous + current.price, 0);
  const extraPart = order.deliveryMode === 'delivery' ? deliveryExtraCharge : 0;
  return {
    ...order,
    amount: amoutWithoutExtra + extraPart,
    amountExtraPart: extraPart,
  };
};

export const newOrderId = () => Date.now();
