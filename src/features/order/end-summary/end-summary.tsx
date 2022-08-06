import styles from './end-summary.module.css';
import { contactInfo } from 'data/store-info';

import type { order } from 'data/model';

type EndSummaryProps = Pick<order, 'id' | 'deliveryMode' | 'contact' | 'amount'>;

export const EndSummary = ({ id, deliveryMode, contact, amount }: EndSummaryProps) => {
  return (
    <div className={styles.endsummary}>
      <p>Votre commande a bien été prise en compte.</p>
      <p>Numéro de commande</p>
      <p>{id}</p>
      {deliveryMode === 'pick-up' ? (
        <>
          <p>Retrait sur place</p>
          <p>{contactInfo.address.line1}</p>
          <p>{contactInfo.address.city}</p>
          <p>{`Tel: ${contactInfo.phoneNumber}`}</p>
        </>
      ) : (
        <>
          <p>Livraison</p>
          <p>{contact?.name}</p>
          <p>{contact?.address?.line1}</p>
          {contact?.address?.line2 && <p>{contact?.address?.line2}</p>}
          <p>{contact?.address?.city}</p>
          <p>{`Tel: ${contact?.phoneNumber}`}</p>
        </>
      )}
      <p>Montant à régler</p>
      <p>{amount}</p>
    </div>
  );
};
