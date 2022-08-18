import styles from './delivery.module.css';
import { Choice } from './choice';
import { Contact } from './contact';
import { useState } from 'react';

import type { Order } from 'data/model';
import type { HandleDeliveryModeChange } from './choice';
import type { HandleContactChange } from './contact';

type DeliveryProps = {
  defaultSelection: Order['deliveryMode'];
  contact: Order['contact'] | undefined;
  onModeChange: HandleDeliveryModeChange;
  onContactChange: HandleContactChange;
};

export const Delivery = ({
  defaultSelection,
  contact,
  onModeChange,
  onContactChange,
}: DeliveryProps) => {
  const [selection, setSelection] = useState(defaultSelection);
  const handleModeChange: HandleDeliveryModeChange = (current) => {
    setSelection(current);
    onModeChange(current);
  };
  return (
    <div className={styles.delivery}>
      <Choice defaultSelection={defaultSelection} onChange={handleModeChange} />
      <Contact deliveryMode={selection} contact={contact} onChange={onContactChange} />
    </div>
  );
};
