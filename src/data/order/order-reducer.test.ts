import { orderReducer } from './order-reducer';
import { DEFAULT_ORDER } from './default-order';
import { updateOrderAmount } from './helpers';

import type { order, ingredient } from 'data/model';

describe('orderReducer', () => {
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

  it('SET_BASE action: return new object with base and amount fields updated', () => {
    const value: order = { ...DEFAULT_ORDER };
    const expected: order = updateOrderAmount({
      ...value,
      base: fakePizzaBase,
    });
    expect(value).not.toEqual(expected);

    const res = orderReducer(value, { type: 'SET_BASE', payload: { base: expected.base } });
    expect(res).not.toBe(value);
    expect(res).toEqual(expected);
  });

  it('SET_INGREDIENTS action: return new object with ingredients and amount fields updated', () => {
    const value: order = { ...DEFAULT_ORDER };
    const expected: order = updateOrderAmount({
      ...value,
      ingredients: fakePizzaIngredients,
    });
    expect(value).not.toEqual(expected);

    const res = orderReducer(value, {
      type: 'SET_INGREDIENTS',
      payload: { ingredients: expected.ingredients },
    });
    expect(res).not.toBe(value);
    expect(res).toEqual(expected);
  });

  it('SET_DELIVERY action: return new object with deliveryMode and amount fields updated', () => {
    const value: order = { ...DEFAULT_ORDER };
    const expected: order = updateOrderAmount({
      ...value,
      deliveryMode: 'delivery',
    });
    expect(value).not.toEqual(expected);

    const res = orderReducer(value, {
      type: 'SET_DELIVERY',
      payload: { deliveryMode: expected.deliveryMode },
    });
    expect(res).not.toBe(value);
    expect(res).toEqual(expected);
  });

  it('SET_CONTACT action: return new object with contact and amount fields updated', () => {
    const value: order = { ...DEFAULT_ORDER };
    const expected: order = updateOrderAmount({
      ...value,
      contact: {
        name: 'John Doe',
        address: { line1: 'somewhere', city: 'Paris' },
        phoneNumber: '(0) 111 2348',
      },
    });
    expect(value).not.toEqual(expected);

    const res = orderReducer(value, {
      type: 'SET_CONTACT',
      payload: { contact: expected.contact },
    });
    expect(res).not.toBe(value);
    expect(res).toEqual(expected);
  });

  it('COMPLETE action: return new object with id field updated', () => {
    const value: order = { ...DEFAULT_ORDER };

    const res = orderReducer(value, {
      type: 'COMPLETE',
    });
    expect(res).not.toBe(value);
    expect(res).toEqual({ ...value, id: res.id });
    expect(res.id).not.toEqual(value.id);
  });

  it('CANCEL action: return new object with default order fields', () => {
    const value: order = {
      id: 98,
      base: { ...fakePizzaBase },
      ingredients: [...fakePizzaIngredients],
      amount: 0,
      amountExtraPart: 0,
      deliveryMode: 'delivery',
    };
    const expected: order = { ...DEFAULT_ORDER };
    expect(value).not.toEqual(expected);

    const res = orderReducer(value, {
      type: 'CANCEL',
    });
    expect(res).not.toBe(value);
    expect(res).toEqual(expected);
  });
});
