import styles from './delivery.module.css';
import { Choice } from './choice';

import type { order } from 'data/model';
import type { handleDeliveryModeChange } from './choice';

type DeliveryProps = {
  defaultSelection: order['deliveryMode'];
  onChange: handleDeliveryModeChange;
  openContactForm: () => void;
};

export const Delivery = ({ defaultSelection, onChange, openContactForm }: DeliveryProps) => {
  return (
    <div className={styles.delivery}>
      <Choice defaultSelection={defaultSelection} onChange={onChange} />
    </div>
  );
};
