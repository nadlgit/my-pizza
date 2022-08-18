import { Ingredient } from './ingredient';

export type Order = {
  id: number;
  base: Ingredient;
  ingredients: Ingredient[];
  amount: number;
  amountExtraPart: number;
  deliveryMode: 'pick-up' | 'delivery';
  contact?: {
    name: string;
    phoneNumber: string;
    address: {
      line1: string;
      line2?: string;
      city: string;
    };
  };
};
