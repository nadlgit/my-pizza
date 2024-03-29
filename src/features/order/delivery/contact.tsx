import styles from './contact.module.css';
import { STORE_CONTACT } from 'data/store-info';
import { Button } from 'shared/components/ui/button';
import { ContactModal } from 'features/contact-modal';
import { useState } from 'react';

import type { Order } from 'data/model';

type ContactProps = Pick<Order, 'deliveryMode' | 'contact'> & {
  onChange: (current: Order['contact']) => void;
};

export type HandleContactChange = ContactProps['onChange'];

export const Contact = ({ deliveryMode, contact, onChange }: ContactProps) => {
  const [showForm, setShowForm] = useState(false);
  const openForm = () => {
    setShowForm(true);
  };
  const closeForm = () => {
    setShowForm(false);
  };

  return (
    <section className={styles.contact}>
      {deliveryMode === 'pick-up' ? (
        <>
          <h2>Nos coordonnées</h2>
          <p>{STORE_CONTACT.address.line1}</p>
          <p>{STORE_CONTACT.address.city}</p>
          <p className={styles.phone}>{`Tel: ${STORE_CONTACT.phoneNumber}`}</p>
        </>
      ) : (
        <>
          <h2>Vos coordonnées</h2>
          {contact ? (
            <>
              <p className={styles.name}>{contact?.name}</p>
              <p>{contact?.address?.line1}</p>
              {contact?.address?.line2 && <p>{contact?.address?.line2}</p>}
              <p>{contact?.address?.city}</p>
              <p className={styles.phone}>{`Tel: ${contact?.phoneNumber}`}</p>
            </>
          ) : (
            <p className={styles.nocontact}>Veuillez saisir vos coordonnées</p>
          )}

          <Button color="yellow" className={styles.button} onClick={openForm}>
            {contact ? 'Modifier' : 'Saisir'}
          </Button>

          <ContactModal
            isOpen={showForm}
            contact={contact}
            onChange={onChange}
            onClose={closeForm}
          />
        </>
      )}
    </section>
  );
};
