import styles from './contact.module.css';
import { Button } from 'shared/components/ui/button';
import { STORE_CONTACT } from 'data/store-info';

import type { order } from 'data/model';

type ContactProps = Pick<order, 'deliveryMode' | 'contact'> & {
  openContactForm: () => void;
};

export const Contact = ({ deliveryMode, contact, openContactForm }: ContactProps) => {
  return (
    <section className={styles.contact}>
      {deliveryMode === 'pick-up' ? (
        <>
          <h2>Nos coordonnées</h2>
          <StoreContact />
        </>
      ) : (
        <>
          <h2>Vos coordonnées</h2>
          <CustomerContact contact={contact} openContactForm={openContactForm} />
        </>
      )}
    </section>
  );
};

const StoreContact = () => {
  return (
    <>
      <p>{STORE_CONTACT.address.line1}</p>
      <p>{STORE_CONTACT.address.city}</p>
      <p className={styles.phone}>{`Tel: ${STORE_CONTACT.phoneNumber}`}</p>
    </>
  );
};

const CustomerContact = ({
  contact,
  openContactForm,
}: Pick<ContactProps, 'contact' | 'openContactForm'>) => {
  return (
    <>
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
      <Button className={styles.button} onClick={openContactForm}>
        Modifier
      </Button>
    </>
  );
};
