import styles from './summary.module.css';
import { DELIVERY_EXTRA_CHARGE } from 'data/order';
import { formatPrice } from 'shared/utils/helpers';

import type { order } from 'data/model';

type SummaryProps = Pick<order, 'amount' | 'base' | 'ingredients' | 'deliveryMode'>;

export const Summary = ({ amount, base, ingredients, deliveryMode }: SummaryProps) => {
  return (
    <div className={styles.summary}>
      <p>Récapitulatif de votre commande</p>
      <SummaryItem label={`Base: ${base.title}`} price={base.price} />
      {ingredients.map((item) => (
        <SummaryItem key={item.id} label={item.title} price={item.price} />
      ))}
      {deliveryMode === 'delivery' && (
        <SummaryItem label="Livraison" price={DELIVERY_EXTRA_CHARGE} />
      )}
      <SummaryItem label="Total" price={amount} />
    </div>
  );
};

type SummaryItemProps = { label: string; price: number };

const SummaryItem = ({ label, price }: SummaryItemProps) => (
  <p>
    <span>{label}</span>
    <span>{formatPrice(price)}</span>
  </p>
);
