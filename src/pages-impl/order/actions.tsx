import { Button } from 'shared/components/ui/button';

type ActionsProps = {
  onCancel: () => void;
};

export const Actions = ({ onCancel }: ActionsProps) => {
  return (
    <section>
      <Button variant="red" onClick={() => onCancel()}>
        Annuler
      </Button>
      <Button action="submit" variant="green">
        Continuer
      </Button>
    </section>
  );
};
