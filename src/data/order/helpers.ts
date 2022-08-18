import { DELIVERY_EXTRA_CHARGE } from './constants';

import type { Order } from 'data/model';

export const updateOrderAmount = (order: Order): Order => {
  const amoutWithoutExtra =
    order.base.price + order.ingredients.reduce((previous, current) => previous + current.price, 0);
  const extraPart = order.deliveryMode === 'delivery' ? DELIVERY_EXTRA_CHARGE : 0;
  return {
    ...order,
    amount: amoutWithoutExtra + extraPart,
    amountExtraPart: extraPart,
  };
};

//NB: in real world application order IDs should be provided by a backend
var _myPizzaOrderId = 1;
export const newOrderId = () => _myPizzaOrderId++;
