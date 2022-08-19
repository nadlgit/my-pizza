import styles from './contact-form.module.css';
import { Button } from 'shared/components/ui/button';

import type { Order } from 'data/model';
import type { FormEventHandler } from 'react';

type Contact = Order['contact'];

type ContactFormProps = {
  contact: Contact;
  onChange: (current: Contact) => void;
  onClose: () => void;
};

function formInputToString(data: FormDataEntryValue | null) {
  if (typeof data !== 'string' || data.trim() === '') {
    return undefined;
  }
  return data.trim();
}

export const ContactForm = ({ contact, onChange, onClose }: ContactFormProps) => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const data = new FormData(e.target as HTMLFormElement);
    onChange({
      name: formInputToString(data.get('name')),
      address: {
        line1: formInputToString(data.get('addrLine1')),
        line2: formInputToString(data.get('addrLine2')),
        city: formInputToString(data.get('city')),
      },
      phoneNumber: formInputToString(data.get('phone')),
    } as Contact);

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <h2> Vos coordonnées</h2>

      <label htmlFor="name">Nom</label>
      <input
        id="name"
        name="name"
        defaultValue={contact?.name}
        type="text"
        pattern="[^\s].*"
        required
      />

      <label htmlFor="addrLine1">Adresse</label>
      <input
        id="addrLine1"
        name="addrLine1"
        defaultValue={contact?.address?.line1}
        type="text"
        pattern="[^\s].*"
        required
      />

      <label htmlFor="addrLine2">Complément d&apos;adresse (optionnel)</label>
      <input
        id="addrLine2"
        name="addrLine2"
        defaultValue={contact?.address?.line2}
        type="text"
        pattern="[^\s].*"
      />

      <label htmlFor="city">Ville</label>
      <input
        id="city"
        name="city"
        defaultValue={contact?.address?.city}
        type="text"
        pattern="[^\s].*"
        required
      />

      <label htmlFor="phone">Numéro de téléphone</label>
      <input
        id="phone"
        name="phone"
        defaultValue={contact?.phoneNumber}
        type="text"
        pattern="[^\s].*"
        required
      />

      <div className={styles.btns}>
        <Button className={styles.cancelbtn} onClick={() => onClose()}>
          Annuler
        </Button>
        <Button className={styles.submitbtn} type="submit">
          Valider
        </Button>
      </div>
    </form>
  );
};
