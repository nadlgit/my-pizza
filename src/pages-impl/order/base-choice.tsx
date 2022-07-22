import { Ingredient } from './ingredient';
import { bases } from 'data/bases';

export const BaseChoice = () => {
  return (
    <div>
      <h2>Choisissez votre base</h2>
      {bases.map((item) => (
        <Ingredient
          key={item.id}
          type="base"
          id={item.id}
          title={item.title}
          imgUrl={item.imgUrl}
          price={item.price}
        />
      ))}
    </div>
  );
};
