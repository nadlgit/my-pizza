import { Ingredient } from './ingredient';
import { bases } from 'data/bases';

export const BaseChoice = () => {
  return (
    <div>
      <h2>Choisissez votre base</h2>
      {bases.map((item, index) => (
        <Ingredient
          key={index}
          title={item.title}
          imgUrl={item.imgUrl}
          price={item.price}
          isSelected={true}
        />
      ))}
    </div>
  );
};
