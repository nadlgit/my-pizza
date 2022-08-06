import styles from './ingredient.module.css';
import { Image } from 'shared/components/ui/image';
import { formatPrice } from 'shared/utils/helpers';

import type { ingredient } from 'data/model';
import type { ChangeEventHandler } from 'react';

type IngredientProps = {
  inputType: 'radio' | 'checkbox';
  inputName: string;
  isInitiallySelected: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
} & Pick<ingredient, 'id' | 'title' | 'imgUrl' | 'price'>;

export const Ingredient = ({
  inputType,
  inputName,
  id,
  title,
  imgUrl,
  price,
  isInitiallySelected,
  onChange,
}: IngredientProps) => {
  return (
    <>
      <input
        id={id}
        type={inputType}
        name={inputName}
        className={styles.input}
        value={id}
        defaultChecked={isInitiallySelected}
        onChange={onChange}
      />
      <label htmlFor={id} className={styles.label}>
        <Image className={styles.image} src={imgUrl} alt={title} />
        <span className={styles.title}>{title}</span>
        <span className={styles.price}>{formatPrice(price)}</span>
      </label>
    </>
  );
};
