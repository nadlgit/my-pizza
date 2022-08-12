import styles from './end-summary.module.css';
import { STORE_CONTACT } from 'data/store-info';
import { formatPrice } from 'shared/utils/helpers';

import type { order } from 'data/model';

type EndSummaryProps = Pick<order, 'id' | 'deliveryMode' | 'contact' | 'amount'>;

export const EndSummary = ({ id, deliveryMode, contact, amount }: EndSummaryProps) => {
  return (
    <div className={styles.endsummary}>
      <p className={styles.title}>Votre commande a bien été prise en compte.</p>
      <p className={styles.heading}>Numéro de commande</p>
      <p>{id}</p>
      {deliveryMode === 'pick-up' ? (
        <>
          <p className={styles.heading}>Retrait sur place</p>
          <p>{STORE_CONTACT.address.line1}</p>
          <p>{STORE_CONTACT.address.city}</p>
          <p>{`Tel: ${STORE_CONTACT.phoneNumber}`}</p>
        </>
      ) : (
        <>
          <p className={styles.heading}>Livraison</p>
          <p>{contact?.name}</p>
          <p>{contact?.address?.line1}</p>
          {contact?.address?.line2 && <p>{contact?.address?.line2}</p>}
          <p>{contact?.address?.city}</p>
          <p>{`Tel: ${contact?.phoneNumber}`}</p>
        </>
      )}
      <p className={styles.heading}>Montant à régler</p>
      <p>{formatPrice(amount)}</p>
    </div>
  );
};
