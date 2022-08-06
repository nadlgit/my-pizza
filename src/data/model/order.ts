import { ingredient } from './ingredient';

export type order = {
  id: number;
  base: ingredient;
  ingredients: ingredient[];
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
