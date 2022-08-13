import { updateOrderAmount, newOrderId } from './helpers';
import { DELIVERY_EXTRA_CHARGE } from './constants';

import type { order, ingredient } from 'data/model';

describe('updateOrderAmount', () => {
  const fakePizzaBase: ingredient = {
    id: 'base-id',
    title: 'Base',
    price: 8,
    imgUrl: 'pizza-base.png',
    previewUrl: 'preview-pizza-base.png',
  };

  const fakePizzaIngredients: ingredient[] = [
    {
      id: 'ingr-id1',
      title: 'Ingredient1',
      price: 0.75,
      imgUrl: 'pizza-ingredient1.png',
      previewUrl: 'preview-pizza-ingredient1.png',
    },
    {
      id: 'ingr-id2',
      title: 'Ingredient2',
      price: 1.1,
      imgUrl: 'pizza-ingredient2.png',
      previewUrl: 'preview-pizza-ingredient2.png',
    },
  ];

  it('should return new object with calculated amount', () => {
    const value: order = {
      id: 1234,
      base: { ...fakePizzaBase },
      ingredients: [...fakePizzaIngredients],
      amount: 0,
      amountExtraPart: 0,
      deliveryMode: 'pick-up',
    };
    const expected: order = {
      ...value,
      amount:
        fakePizzaBase.price + fakePizzaIngredients.reduce((price, item) => price + item.price, 0),
      amountExtraPart: 0,
    };
    expect(value).not.toEqual(expected);

    const res = updateOrderAmount(value);
    expect(res).not.toBe(value);
    expect(res).toEqual(expected);
  });

  it('should apply extra charge for delivery', () => {
    const value: order = {
      id: 98,
      base: { ...fakePizzaBase },
      ingredients: [...fakePizzaIngredients],
      amount: 0,
      amountExtraPart: 0,
      deliveryMode: 'delivery',
    };
    const expected: order = {
      ...value,
      amount:
        fakePizzaBase.price +
        fakePizzaIngredients.reduce((price, item) => price + item.price, 0) +
        DELIVERY_EXTRA_CHARGE,
      amountExtraPart: DELIVERY_EXTRA_CHARGE,
    };
    expect(value).not.toEqual(expected);

    const res = updateOrderAmount(value);
    expect(res).not.toBe(value);
    expect(res).toEqual(expected);
  });
});

describe('newOrderId', () => {
  it('should return different values at each call', () => {
    const res1 = newOrderId();
    const res2 = newOrderId();
    expect(res2).not.toEqual(res1);
  });
});
