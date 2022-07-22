import styles from './ingredient.module.css';
import { Image } from 'shared/components/ui/image';

type IngredientProps = {
  type: 'base' | 'ingredient';
  id: string;
  title: string;
  imgUrl: string;
  price: number;
};

export const Ingredient = ({ type, id, title, imgUrl, price }: IngredientProps) => {
  const formattedPrice = `${price.toFixed(2).replace('.', ',')}€`;
  const inputType = type === 'base' ? 'radio' : 'checkbox';
  const inputName = type === 'base' ? 'base' : 'ingredient';
  return (
    <>
      <input id={id} type={inputType} name={inputName} className={styles.input} />
      <label htmlFor={id} className={styles.label}>
        <Image className={styles.image} src={imgUrl} alt={title} />
        <span className={styles.title}>{title}</span>
        <span className={styles.price}>{formattedPrice}</span>
      </label>
    </>
  );
};
