import { Preview } from './preview';
import { IngredientGroup } from './ingredient-group';
import { Actions } from './actions';
import { bases } from 'data/bases';
import { ingredients } from 'data/ingredients';

export const Order = () => {
  return (
    <form>
      <Preview />
      <IngredientGroup
        type="radio"
        name="base"
        title="Choisissez votre base"
        list={bases}
        defaultSelection={[bases[0].id]}
        onChange={(current) => console.log(current)}
      />
      <IngredientGroup
        type="checkbox"
        name="ingredient"
        title="Choisissez vos ingrédients"
        list={ingredients}
        defaultSelection={[]}
        onChange={(current) => console.log(current)}
      />
      <Actions />
    </form>
  );
};
