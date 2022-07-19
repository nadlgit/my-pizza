import styles from './ingredient.module.css';
import { Image } from 'shared/components/ui/image';

type IngredientProps = {
  title: string;
  imgUrl: string;
  price: number;
  isSelected: boolean;
};

export const Ingredient = ({ title, imgUrl, price, isSelected }: IngredientProps) => {
  return (
    <div className={`${styles.container} ${isSelected ? styles.selected : ''} `}>
      <Image className={styles.image} src={imgUrl} alt={title} />
      <p>{title}</p>
      <p>{price.toFixed(2).replace('.', ',')}&euro;</p>
    </div>
  );
};
