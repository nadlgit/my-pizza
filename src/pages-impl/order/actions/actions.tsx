import styles from './actions.module.css';
import { CancelButton, SubmitButton } from 'shared/components/ui/button';

type ActionsProps = {
  onCancel: () => void;
};

export const Actions = ({ onCancel }: ActionsProps) => {
  return (
    <div className={styles.actions}>
      <CancelButton onCancel={onCancel}>Annuler</CancelButton>
      <SubmitButton>Continuer</SubmitButton>
    </div>
  );
};
