import styles from './Modal.module.css';
import { createPortal } from 'react-dom';
import FocusTrap from 'focus-trap-react';
import { useEffect, useState } from 'react';

import type { ReactNode } from 'react';

type ModalProps = { isOpen: boolean; close: () => void; children: ReactNode };

export const Modal = ({ isOpen, close, children }: ModalProps) => {
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const [trapActive, setTrapActive] = useState(false);
  useEffect(() => {
    setTrapActive(showModal);
  }, [showModal]);

  return showModal
    ? createPortal(
        <div className={styles.backdrop}>
          <FocusTrap
            active={trapActive}
            focusTrapOptions={{
              onDeactivate: () => {
                close();
              },
              escapeDeactivates: true,
              clickOutsideDeactivates: true,
            }}
          >
            <div className={styles.content} role="dialog">
              {children}
            </div>
          </FocusTrap>
        </div>,
        document.getElementById('modal') as Element
      )
    : null;
};
