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

type FieldConfig = {
  name: keyof FormValues;
  label: string;
  type?: HTMLInputElement['type'];
  required?: { errorMsg: string };
  pattern?: {
    value: RegExp;
    errorMsg: string;
  };
};

const formFields: FieldConfig[] = [
  {
    name: 'name',
    label: 'Nom',
    required: { errorMsg: 'Vous devez indiquer votre nom' },
    pattern: {
      value: /^[a-zA-Z]/,
      errorMsg: 'Votre nom doit commencer par une lettre',
    },
  },
  {
    name: 'addrLine1',
    label: 'Adresse',
    required: { errorMsg: 'Vous devez indiquer votre adresse' },
    pattern: {
      value: /^[a-zA-Z0-9]/,
      errorMsg: 'Votre adresse doit commencer par une lettre ou un chiffre',
    },
  },
  {
    name: 'addrLine2',
    label: "Complément d'adresse",
  },
  {
    name: 'city',
    label: 'Ville',
    required: { errorMsg: 'Vous devez indiquer votre ville' },
    pattern: {
      value: /^[a-zA-Z]/,
      errorMsg: 'Votre ville doit commencer par une lettre',
    },
  },
  {
    name: 'phone',
    label: 'Numéro de téléphone',
    type: 'tel',
    required: { errorMsg: 'Vous devez indiquer votre numéro de téléphone' },
    pattern: {
      value: /^[-+().\d\s]+$/,
      errorMsg:
        'Votre numéro de téléphone ne doit comporter que des chiffres ou les caractères "+ - ( ) ."',
    },
  },
];

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
        <h2 className={styles.title}> Vos coordonnées</h2>

        {formFields.map((item) => {
          return (
            <p
              key={item.name}
              className={`${styles.field} ${errors[item.name] ? styles.invalid : ''}`}
            >
              <label htmlFor={item.name}>
                {item.label}
                <span>{item?.required ? '' : ' (optionnel)'}</span>
              </label>
              <input
                id={item.name}
                type={item?.type ?? 'text'}
                {...register(item.name, {
                  setValueAs: (txt) => txt.trim(),
                  required: item?.required?.errorMsg ?? undefined,
                  pattern: item?.pattern?.value
                    ? { value: item.pattern.value, message: item?.pattern?.errorMsg ?? undefined }
                    : undefined,
                })}
              />
              <span role="status" className={styles.error}>
                {errors[item.name]?.message}
              </span>
            </p>
          );
        })}

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
