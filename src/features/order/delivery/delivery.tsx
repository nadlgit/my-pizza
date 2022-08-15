import styles from './delivery.module.css';
import { Choice } from './choice';
import { Contact } from './contact';
import { useState } from 'react';

import type { order } from 'data/model';
import type { handleDeliveryModeChange } from './choice';
import type { handleContactChange } from './contact';

type DeliveryProps = {
  defaultSelection: order['deliveryMode'];
  contact: order['contact'] | undefined;
  onModeChange: handleDeliveryModeChange;
  onContactChange: handleContactChange;
};

export const Delivery = ({
  defaultSelection,
  contact,
  onModeChange,
  onContactChange,
}: DeliveryProps) => {
  const [selection, setSelection] = useState(defaultSelection);
  const handleModeChange: handleDeliveryModeChange = (current) => {
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
