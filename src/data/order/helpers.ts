import { DELIVERY_EXTRA_CHARGE } from './constants';

import type { order } from 'data/model';

export const updateOrderAmount = (order: order): order => {
  const amoutWithoutExtra =
    order.base.price + order.ingredients.reduce((previous, current) => previous + current.price, 0);
  const extraPart = order.deliveryMode === 'delivery' ? DELIVERY_EXTRA_CHARGE : 0;
  return {
    ...order,
    amount: amoutWithoutExtra + extraPart,
    amountExtraPart: extraPart,
  };
};

export const newOrderId = () => {
  const value = new Date();
  value.setFullYear(1970, 0, 1);
  value.setHours(0);
  return value.getTime();
};
