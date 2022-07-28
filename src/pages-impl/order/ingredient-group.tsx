import styles from './ingredient-group.module.css';
import { Ingredient } from './ingredient';
import { useState } from 'react';

import type { ingredient } from 'data/model';

type ingredientSelection = ingredient['id'][];

type IngredientGroupProps = {
  type: 'radio' | 'checkbox';
  name: string;
  title: string;
  list: Readonly<Pick<ingredient, 'id' | 'title' | 'imgUrl' | 'price'>[]>;
  defaultSelection: ingredientSelection;
  onChange: (current: ingredientSelection) => void;
};

export type handleIngredientGroupChange = IngredientGroupProps['onChange'];

export const IngredientGroup = ({
  type,
  name,
  title,
  list,
  defaultSelection,
  onChange,
}: IngredientGroupProps) => {
  const [selection, setSelection] = useState(defaultSelection);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value, checked } = e.target;
    let newSelection: ingredientSelection | undefined;
    if (type === 'radio') {
      newSelection = [value];
    }
    if (type === 'checkbox') {
      newSelection = checked ? [...selection, value] : selection.filter((id) => id !== value);
    }
    if (newSelection) {
      setSelection(newSelection);
      onChange(newSelection);
    }
  };

  return (
    <div>
      <h2>{title}</h2>
      {list.map((item) => (
        <Ingredient
          key={item.id}
          inputType={type}
          inputName={name}
          id={item.id}
          title={item.title}
          imgUrl={item.imgUrl}
          price={item.price}
          isInitiallySelected={defaultSelection.includes(item.id)}
          onChange={handleChange}
        />
      ))}
    </div>
  );
};
