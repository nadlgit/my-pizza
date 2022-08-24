import styles from './contact-modal.module.css';
import { Modal } from 'shared/components/modal';
import { Button } from 'shared/components/ui/button';
import { useForm } from 'react-hook-form';

import type { Order } from 'data/model';
import type { FormEventHandler } from 'react';
import type { SubmitHandler } from 'react-hook-form';

type Contact = Order['contact'];

type ContactModalProps = {
  isOpen: boolean;
  contact: Contact;
  onChange: (current: Contact) => void;
  onClose: () => void;
};

type FormValues = {
  name: string;
  addrLine1: string;
  addrLine2: string;
  city: string;
  phone: string;
};

export const ContactModal = ({ isOpen, contact, onChange, onClose }: ContactModalProps) => {
  const formDefaultValues = {
    name: contact?.name ?? '',
    addrLine1: contact?.address?.line1 ?? '',
    addrLine2: contact?.address?.line2 ?? '',
    city: contact?.address?.city ?? '',
    phone: contact?.phoneNumber ?? '',
  };

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    reset,
  } = useForm<FormValues>({
    mode: 'all',
    defaultValues: formDefaultValues,
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    onChange({
      name: data.name,
      address: {
        line1: data.addrLine1,
        line2: data.addrLine2 === '' ? undefined : data.addrLine2,
        city: data.city,
      },
      phoneNumber: data.phone,
    });
    onClose();
  };

  const onCancel = () => {
    reset(formDefaultValues);
    onClose();
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleSubmit(onSubmit)(e);
  };

  return (
    <Modal isOpen={isOpen} close={onClose}>
      <form onSubmit={handleFormSubmit} className={styles.container}>
        <h2> Vos coordonnées</h2>

        <label htmlFor="name">Nom</label>
        <input
          id="name"
          type="text"
          {...register('name', {
            setValueAs: (txt) => txt.trim(),
            required: 'Vous devez indiquer votre nom',
            pattern: {
              value: /^[a-zA-Z]/,
              message: 'Votre nom doit commencer par une lettre',
            },
          })}
        />
        <span>{errors?.name?.message}</span>

        <label htmlFor="addrLine1">Adresse</label>
        <input
          id="addrLine1"
          type="text"
          {...register('addrLine1', {
            setValueAs: (txt) => txt.trim(),
            required: 'Vous devez indiquer votre adresse',
            pattern: {
              value: /^[a-zA-Z0-9]/,
              message: 'Votre adresse doit commencer par une lettre ou un chiffre',
            },
          })}
        />
        <span>{errors?.addrLine1?.message}</span>

        <label htmlFor="addrLine2">Complément d&apos;adresse (optionnel)</label>
        <input
          id="addrLine2"
          type="text"
          {...register('addrLine2', { setValueAs: (txt) => txt.trim() })}
        />

        <label htmlFor="city">Ville</label>
        <input
          id="city"
          type="text"
          {...register('city', {
            setValueAs: (txt) => txt.trim(),
            required: 'Vous devez indiquer votre ville',
            pattern: {
              value: /^[a-zA-Z]/,
              message: 'Votre ville doit commencer par une lettre',
            },
          })}
        />
        <span>{errors?.city?.message}</span>

        <label htmlFor="phone">Numéro de téléphone</label>
        <input
          id="phone"
          type="text"
          {...register('phone', {
            setValueAs: (txt) => txt.trim(),
            required: 'Vous devez indiquer votre numéro de téléphone',
            pattern: {
              value: /^[-+()\.\d\s]+$/,
              message:
                'Votre numéro de téléphone ne doit comporter que des chiffres ou les caractères "+ - ( ) ."',
            },
          })}
        />
        <span>{errors?.phone?.message}</span>

        <div className={styles.btns}>
          <Button color="red" onClick={onCancel}>
            Annuler
          </Button>
          <Button color="green" type="submit" disabled={!isValid}>
            Valider
          </Button>
        </div>
      </form>
    </Modal>
  );
};
