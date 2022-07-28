import styles from './order.module.css';
import { Preview } from './preview';
import { IngredientGroup } from './ingredient-group';
import { Actions } from './actions';
import { bases } from 'data/bases';
import { ingredients } from 'data/ingredients';
import { useOrder } from 'data/order';

import type { handleIngredientGroupChange } from './ingredient-group';
import type { ingredient } from 'data/model';

export const Order = () => {
  const { order, setBase, setIngredients, cancelOrder } = useOrder();
  const handleBaseSelection: handleIngredientGroupChange = (current) => {
    if (current.length === 1) {
      setBase(bases.find((item) => item.id === current[0]) as ingredient);
    }
  };
  const handleIngrSelection: handleIngredientGroupChange = (current) => {
    const selection = current.map((id) => ingredients.find((item) => item.id === id) as ingredient);
    setIngredients(selection);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className={styles.container}>
      <Preview amount={order.amount} base={order.base} ingredients={order.ingredients} />
      <IngredientGroup
        type="radio"
        name="base"
        title="Choisissez votre base"
        list={bases}
        defaultSelection={[order.base.id]}
        onChange={handleBaseSelection}
      />
      <IngredientGroup
        type="checkbox"
        name="ingredient"
        title="Choisissez vos ingrédients"
        list={ingredients}
        defaultSelection={order.ingredients.map((item) => item.id)}
        onChange={handleIngrSelection}
      />
      <Actions />
    </form>
  );
};
