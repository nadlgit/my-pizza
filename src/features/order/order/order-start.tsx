import { PIZZA_BASES } from 'data/bases';
import { PIZZA_INGREDIENTS } from 'data/ingredients';
import { Actions } from '../actions';
import { Preview } from '../preview';
import { IngredientGroup } from '../ingredient-group';

import type { Order, Ingredient } from 'data/model';
import type { HandleIngredientGroupChange } from '../ingredient-group';
import type { FormEventHandler } from 'react';

type OrderStartProps = {
  order: Order;
  setBase: (value: Order['base']) => void;
  setIngredients: (value: Order['ingredients']) => void;
  handleCancel: () => void;
  handleFormSubmit: FormEventHandler<HTMLFormElement>;
  className: string;
};

export const OrderStart = ({
  order,
  setBase,
  setIngredients,
  handleCancel,
  handleFormSubmit,
  className,
}: OrderStartProps) => {
  const handleBaseSelection: HandleIngredientGroupChange = (current) => {
    if (current.length === 1) {
      setBase(PIZZA_BASES.find((item) => item.id === current[0]) as Ingredient);
    }
  };
  const handleIngrSelection: HandleIngredientGroupChange = (current) => {
    const selection = current.map(
      (id) => PIZZA_INGREDIENTS.find((item) => item.id === id) as Ingredient
    );
    setIngredients(selection);
  };

  return (
    <form onSubmit={handleFormSubmit} className={className}>
      <Preview
        amount={order.amount - order.amountExtraPart}
        base={order.base}
        ingredients={order.ingredients}
      />
      <IngredientGroup
        type="radio"
        name="base"
        title="Choisissez votre base"
        list={PIZZA_BASES}
        defaultSelection={[order.base.id]}
        onChange={handleBaseSelection}
      />
      <IngredientGroup
        type="checkbox"
        name="ingredient"
        title="Choisissez vos ingrédients"
        list={PIZZA_INGREDIENTS}
        defaultSelection={order.ingredients.map((item) => item.id)}
        onChange={handleIngrSelection}
      />
      <Actions
        cancel={{ label: 'Annuler', onClick: handleCancel }}
        submit={{ label: 'Continuer' }}
      />
    </form>
  );
};
