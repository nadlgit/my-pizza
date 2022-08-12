import styles from './summary.module.css';
import { DELIVERY_EXTRA_CHARGE } from 'data/order';
import { formatPrice } from 'shared/utils/helpers';

import type { order } from 'data/model';

type SummaryProps = Pick<order, 'amount' | 'base' | 'ingredients' | 'deliveryMode'>;

export const Summary = ({ amount, base, ingredients, deliveryMode }: SummaryProps) => {
  return (
    <section className={styles.summary}>
      <h2>Récapitulatif de votre commande</h2>
      <SummaryItem label={`Base: ${base.title}`} price={base.price} />
      {ingredients.map((item) => (
        <SummaryItem key={item.id} label={item.title} price={item.price} />
      ))}
      {deliveryMode === 'delivery' && (
        <SummaryItem label="Livraison" price={DELIVERY_EXTRA_CHARGE} />
      )}
      <SummaryItem label="Total" price={amount} isTotal />
    </section>
  );
};

type SummaryItemProps = { label: string; price: number; isTotal?: boolean };

const SummaryItem = ({ label, price, isTotal }: SummaryItemProps) => (
  <p className={isTotal ? styles.total : ''}>
    <span>{label}</span>
    <span>{formatPrice(price)}</span>
  </p>
);
