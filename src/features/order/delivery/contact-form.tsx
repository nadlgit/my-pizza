import styles from './contact-form.module.css';
import { Button } from 'shared/components/ui/button';
import { useState } from 'react';

import type { order } from 'data/model';

type contact = order['contact'];

type ContactFormProps = {
  contact: contact;
  onChange: (current: contact) => void;
  onClose: () => void;
};

export const ContactForm = ({ contact, onChange, onClose }: ContactFormProps) => {
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const handleSubmit = () => {
    // onChange({});
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <p>{contact?.name}</p>
      <p>{contact?.address?.line1}</p>
      <p>{contact?.address?.line2}</p>
      <p>{contact?.address?.city}</p>
      <p>{contact?.phoneNumber}</p>
      <div className={styles.btns}>
        <Button className={styles.cancelbtn} onClick={() => onClose()}>
          Annuler
        </Button>
        <Button
          className={submitDisabled ? styles.disabledbtn : styles.submitbtn}
          type="submit"
          disabled={submitDisabled}
        >
          Valider
        </Button>
      </div>
    </form>
  );
};
