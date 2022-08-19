import styles from './button.module.css';

import type { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';

export type ButtonColor = 'orange' | 'red' | 'green' | 'yellow';

type ButtonProps = {
  color: ButtonColor;
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const Button = ({ color, className, children, type, ...otherprops }: ButtonProps) => {
  return (
    <button
      type={type ?? 'button'}
      className={`${styles.button} ${styles[color] ?? ''} ${className ?? ''}`}
      {...otherprops}
    >
      {children}
    </button>
  );
};
