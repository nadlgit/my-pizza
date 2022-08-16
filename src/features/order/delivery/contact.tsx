import styles from './contact.module.css';
import { STORE_CONTACT } from 'data/store-info';
import { Button } from 'shared/components/ui/button';
import { Modal } from 'shared/components/modal';
import { ContactForm } from './contact-form';
import { useState } from 'react';

import type { order } from 'data/model';

type ContactProps = Pick<order, 'deliveryMode' | 'contact'> & {
  onChange: (current: order['contact']) => void;
};

export type handleContactChange = ContactProps['onChange'];

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
          <Button className={styles.button} onClick={openForm}>
            {contact ? 'Modifier' : 'Saisir'}
          </Button>
          <Modal isOpen={showForm} close={closeForm}>
            <ContactForm contact={contact} onChange={onChange} onClose={closeForm} />
          </Modal>
        </>
      )}
    </section>
  );
};
