import styles from './contact.module.css';
import { Button } from 'shared/components/ui/button';
import { STORE_CONTACT } from 'data/store-info';

import type { order } from 'data/model';

type ContactProps = Pick<order, 'deliveryMode' | 'contact'> & {
  openContactForm: () => void;
};

export const Contact = ({ deliveryMode, contact, openContactForm }: ContactProps) => {
  return (
    <div className={styles.contact}>
      {deliveryMode === 'pick-up' ? (
        <StoreContact />
      ) : (
        <CustomerContact contact={contact} openContactForm={openContactForm} />
      )}
    </div>
  );
};

const StoreContact = () => {
  return (
    <>
      <p>Nos coordonnées</p>
      <p>{STORE_CONTACT.address.line1}</p>
      <p>{STORE_CONTACT.address.city}</p>
      <p>{`Tel: ${STORE_CONTACT.phoneNumber}`}</p>
    </>
  );
};

const CustomerContact = ({
  contact,
  openContactForm,
}: Pick<ContactProps, 'contact' | 'openContactForm'>) => {
  return (
    <>
      <p>Vos coordonnées</p>
      {contact ? (
        <>
          <p>{contact?.name}</p>
          <p>{contact?.address?.line1}</p>
          {contact?.address?.line2 && <p>{contact?.address?.line2}</p>}
          <p>{contact?.address?.city}</p>
          <p>{`Tel: ${contact?.phoneNumber}`}</p>
        </>
      ) : (
        <p>Veuillez saisir vos coordonnées</p>
      )}
      <Button look="yellow" onClick={openContactForm}>
        Modifier
      </Button>
    </>
  );
};
