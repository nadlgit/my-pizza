import { Preview } from './preview';
import { BaseChoice } from './base-choice';
import { IngredientChoice } from './ingredient-choice';
import { Actions } from './actions';

export const Order = () => {
  return (
    <div>
      <Preview />
      <BaseChoice />
      <IngredientChoice />
      <Actions />
    </div>
  );
};
