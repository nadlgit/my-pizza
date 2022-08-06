import styles from './actions.module.css';
import { CancelButton, SubmitButton, Button } from 'shared/components/ui/button';
import BackImg from './back.png';
import { Image } from 'shared/components/ui/image';

type ActionsProps = {
  cancel: { label: string; onClick: () => void };
  submit: { label: string; disabled?: boolean };
  back?: { label: string; onClick: () => void };
};

export const Actions = ({ cancel, submit, back }: ActionsProps) => {
  return (
    <div className={styles.actions}>
      {back && (
        <Button look="orange" onClick={() => back?.onClick()}>
          <Image src={BackImg} alt={back.label} className={styles.backimg} />
          <span className={styles.backtxt}>{back.label}</span>
        </Button>
      )}
      <CancelButton onCancel={cancel.onClick}>{cancel.label}</CancelButton>
      <SubmitButton disabled={submit?.disabled ?? false}>{submit.label}</SubmitButton>
    </div>
  );
};
