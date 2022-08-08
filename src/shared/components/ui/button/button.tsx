import styles from './button.module.css';

import type { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const Button = ({ className, children, ...otherprops }: ButtonProps) => {
  return (
    <button className={`${styles.button}  ${className ?? ''}`} {...otherprops}>
      {children}
    </button>
  );
};
