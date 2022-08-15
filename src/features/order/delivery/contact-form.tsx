import styles from './contact-form.module.css';

import type { order } from 'data/model';

type contact = order['contact'];

type ContactFormProps = {
  contact: contact;
  onChange: (current: contact) => void;
  onClose: () => void;
};

export const ContactForm = ({ contact, onChange, onClose }: ContactFormProps) => {
  const handleSubmit = () => {
    // onChange({});
    onClose();
  };
  return (
    <form>
      <p>TEST</p>
      <p>{contact?.name}</p>
      <p>{contact?.address?.line1}</p>
      <p>{contact?.address?.line2}</p>
      <p>{contact?.address?.city}</p>
      <p>{contact?.phoneNumber}</p>
      <button type="button" onClick={() => onClose()}>
        Fermer
      </button>
    </form>
  );
};
