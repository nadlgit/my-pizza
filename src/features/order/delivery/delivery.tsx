import styles from './delivery.module.css';
import { Choice } from './choice';
import { Contact } from './contact';
import { useState } from 'react';

import type { order } from 'data/model';
import type { handleDeliveryModeChange } from './choice';

type DeliveryProps = {
  defaultSelection: order['deliveryMode'];
  onChange: handleDeliveryModeChange;
  contact: order['contact'] | undefined;
  openContactForm: () => void;
};

export const Delivery = ({
  defaultSelection,
  onChange,
  contact,
  openContactForm,
}: DeliveryProps) => {
  const [selection, setSelection] = useState(defaultSelection);
  const handleChange: handleDeliveryModeChange = (current) => {
    setSelection(current);
    onChange(current);
  };
  return (
    <div className={styles.delivery}>
      <Choice defaultSelection={defaultSelection} onChange={handleChange} />
      <Contact deliveryMode={selection} contact={contact} openContactForm={openContactForm} />
    </div>
  );
};
