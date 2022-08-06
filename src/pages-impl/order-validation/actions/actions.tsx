import styles from './actions.module.css';
import { CancelButton, SubmitButton, Button } from 'shared/components/ui/button';
import BackImg from './back.png';
import { Image } from 'shared/components/ui/image';

type ActionsProps = {
  onCancel: () => void;
  onBack: () => void;
  submitDisabled: boolean;
};

export const Actions = ({ onCancel, submitDisabled, onBack }: ActionsProps) => {
  return (
    <div className={styles.actions}>
      <Button look="orange" onClick={() => onBack()}>
        <Image src={BackImg} alt="Retour" className={styles.backimg} />
        <span className={styles.backtxt}>Retour</span>
      </Button>
      <CancelButton onCancel={onCancel}>Annuler</CancelButton>
      <SubmitButton disabled={submitDisabled}>Valider</SubmitButton>
    </div>
  );
};
