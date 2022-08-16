import styles from './Modal.module.css';
import { createPortal } from 'react-dom';
import { useMounted } from 'shared/utils/use-mounted';
import { ReactNode } from 'react';

type ModalProps = { isOpen: boolean; close: () => void; children: ReactNode };

export const Modal = ({ isOpen, close, children }: ModalProps) => {
  const isMounted = useMounted();

  return isMounted && isOpen
    ? createPortal(
        <div className={styles.backdrop}>
          <div className={styles.content} role="dialog">
            {children}
          </div>
        </div>,
        document.getElementById('modal') as Element
      )
    : null;
};
