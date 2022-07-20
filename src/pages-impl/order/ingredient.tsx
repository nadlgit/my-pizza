import styles from './ingredient.module.css';
import { Image } from 'shared/components/ui/image';

type IngredientProps = {
  type: 'base' | 'ingredient';
  title: string;
  imgUrl: string;
  price: number;
  isSelected: boolean;
};

export const Ingredient = ({ type, title, imgUrl, price, isSelected = false }: IngredientProps) => {
  const formattedPrice = `${price.toFixed(2).replace('.', ',')}€`;
  return (
    <label className={`${styles.container} ${isSelected ? styles.selected : ''} `}>
      <Image className={styles.image} src={imgUrl} alt={title} />
      <span className={styles.title}>{title}</span>
      <span className={styles.price}>{formattedPrice}</span>
      {type === 'base' ? (
        <input type="radio" name="base" />
      ) : (
        <input type="checkbox" name="ingredient" />
      )}
    </label>
  );
};
