import styles from './ingredient-group.module.css';
import { Ingredient } from './ingredient';
import { useState } from 'react';

import type { Ingredient as TIngredient } from 'data/model';
import type { ChangeEventHandler } from 'react';

type IngredientSelection = TIngredient['id'][];

type IngredientGroupProps = {
  type: 'radio' | 'checkbox';
  name: string;
  title: string;
  list: Readonly<Pick<TIngredient, 'id' | 'title' | 'imgUrl' | 'price'>[]>;
  defaultSelection: IngredientSelection;
  onChange: (current: IngredientSelection) => void;
};

export type HandleIngredientGroupChange = IngredientGroupProps['onChange'];

export const IngredientGroup = ({
  type,
  name,
  title,
  list,
  defaultSelection,
  onChange,
}: IngredientGroupProps) => {
  const [selection, setSelection] = useState(defaultSelection);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value, checked } = e.target;
    let newSelection: IngredientSelection | undefined;
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
    <section className={styles.group}>
      <h2 className={styles.title}>{title}</h2>
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
    </section>
  );
};
