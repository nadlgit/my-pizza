import styles from './choice.module.css';
import { deliveryExtraCharge } from 'data/order';
import { formatPrice } from 'shared/utils/helpers';

import type { order } from 'data/model';
import type { ChangeEventHandler, ReactNode } from 'react';

type deliverySelection = order['deliveryMode'];

type ChoiceProps = {
  defaultSelection: deliverySelection;
  onChange: (current: deliverySelection) => void;
};

export type handleDeliveryModeChange = ChoiceProps['onChange'];

export const Choice = ({ defaultSelection, onChange }: ChoiceProps) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newSelection = e.target.value as deliverySelection;
    onChange(newSelection);
  };

  return (
    <div className={styles.choice}>
      <ChoiceItem value="pick-up" defaultSelection={defaultSelection} onChange={handleChange}>
        Retrait sur place
      </ChoiceItem>
      <ChoiceItem value="delivery" defaultSelection={defaultSelection} onChange={handleChange}>
        {`Livraison (+ ${
          Number.isInteger(deliveryExtraCharge)
            ? `${deliveryExtraCharge}€`
            : formatPrice(deliveryExtraCharge)
        })`}
      </ChoiceItem>
    </div>
  );
};

type ChoiceItemProps = {
  value: deliverySelection;
  defaultSelection: deliverySelection;
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
