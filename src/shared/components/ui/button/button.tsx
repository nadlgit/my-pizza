import styles from './button.module.css';
import Link from 'next/link';

import type { DetailedHTMLProps, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

const buttonActions = {
  button: { className: styles.button },
  submit: { className: styles.button },
  link: { className: styles.link },
};

const buttonVariants = {
  green: { className: styles.green },
  red: { className: styles.red },
  orange: { className: styles.orange },
  yellow: { className: styles.yellow },
};

type ButtonProps =
  | ({
      action?: keyof Pick<typeof buttonActions, 'button' | 'submit'>;
      variant?: keyof typeof buttonVariants;
    } & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>)
  | ({
      action: keyof Pick<typeof buttonActions, 'link'>;
      variant?: keyof typeof buttonVariants;
      url: string;
    } & DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>);

export const Button = (props: ButtonProps) => {
  const className =
    buttonActions[props?.action ?? 'button'].className +
    (props?.variant ? ' ' + buttonVariants[props.variant].className : '') +
    (props?.className ? ' ' + props.className : '');

  if (props?.action === 'link') {
    return (
      <Link href={props?.url}>
        <a {...props} className={className}>
          {props.children}
        </a>
      </Link>
    );
  }

  return (
    <button
      {...props}
      className={className}
      type={props?.action === 'submit' ? 'submit' : 'button'}
    >
      {props.children}
    </button>
  );
};
