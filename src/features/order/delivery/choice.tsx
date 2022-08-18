import styles from './choice.module.css';
import { DELIVERY_EXTRA_CHARGE } from 'data/order';
import { formatPrice } from 'shared/utils/helpers';

import type { Order } from 'data/model';
import type { ChangeEventHandler, ReactNode } from 'react';

type DeliverySelection = Order['deliveryMode'];

type ChoiceProps = {
  defaultSelection: DeliverySelection;
  onChange: (current: DeliverySelection) => void;
};

export type HandleDeliveryModeChange = ChoiceProps['onChange'];

export const Choice = ({ defaultSelection, onChange }: ChoiceProps) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newSelection = e.target.value as DeliverySelection;
    onChange(newSelection);
  };

  return (
    <div className={styles.choice}>
      <ChoiceItem value="pick-up" defaultSelection={defaultSelection} onChange={handleChange}>
        Retrait sur place
      </ChoiceItem>
      <ChoiceItem value="delivery" defaultSelection={defaultSelection} onChange={handleChange}>
        {`Livraison (+ ${
          Number.isInteger(DELIVERY_EXTRA_CHARGE)
            ? `${DELIVERY_EXTRA_CHARGE}€`
            : formatPrice(DELIVERY_EXTRA_CHARGE)
        })`}
      </ChoiceItem>
    </div>
  );
};

type ChoiceItemProps = {
  value: DeliverySelection;
  defaultSelection: DeliverySelection;
  onChange: ChangeEventHandler<HTMLInputElement>;
  children: ReactNode;
};

const ChoiceItem = ({ value, defaultSelection, onChange, children }: ChoiceItemProps) => {
  const id = `dmode-${value}`;
  return (
    <>
      <input
        id={id}
        type="radio"
        name="deliverymode"
        value={value}
        defaultChecked={value === defaultSelection}
        onChange={onChange}
        className={styles.input}
      />
      <label htmlFor={id} className={styles.label}>
        {children}
      </label>
    </>
  );
};
