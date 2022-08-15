import styles from './Modal.module.css';
import { createPortal } from 'react-dom';
import { ReactNode, useEffect, useState } from 'react';

import type { MouseEventHandler } from 'react';

type ModalProps = { isOpen: boolean; close: () => void; children: ReactNode };

export const Modal = ({ isOpen, close, children }: ModalProps) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleOverlayClose: MouseEventHandler<HTMLDivElement> = (e) => {
    const { className } = e.target as HTMLDivElement;
    if (className === styles.overlay) {
      close();
    }
  };

  return isMounted && isOpen
    ? createPortal(
        <div className={styles.overlay} onClick={handleOverlayClose}>
          <div role="dialog" className={styles.content}>
            {children}
          </div>
        </div>,
        document.getElementById('modal') as Element
      )
    : null;
};
