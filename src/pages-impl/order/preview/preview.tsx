import styles from './preview.module.css';
import { Image } from 'shared/components/ui/image';
import PreviewPizza from './preview-pizza.png';

import type { order } from 'data/model';

type PreviewProps = Pick<order, 'amount' | 'base' | 'ingredients'>;

export const Preview = ({ amount, base, ingredients }: PreviewProps) => {
  const formattedAmount = `${amount.toFixed(2).replace('.', ',')}€`;
  const previewItems = [
    base,
    ...ingredients.filter((item) => !item?.previewOnTop),
    ...ingredients.filter((item) => item?.previewOnTop),
  ];
  return (
    <div className={styles.container}>
      <div className={styles.preview}>
        <Image src={PreviewPizza} alt="" className={styles.image} />
        {previewItems.map((item) => (
          <Image
            key={item.id}
            src={item.previewUrl}
            alt=""
            className={`${styles.image} ${styles.overlay}`}
          />
        ))}
      </div>
      <div className={styles.price}>{`Prix: ${formattedAmount}`}</div>
    </div>
  );
};
