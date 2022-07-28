import type { order } from 'data/model';

type PreviewProps = Pick<order, 'amount' | 'base' | 'ingredients'>;

export const Preview = ({ amount, base, ingredients }: PreviewProps) => {
  const formattedAmount = `${amount.toFixed(2).replace('.', ',')}€`;
  return <div>{`Prix: ${formattedAmount}`}</div>;
};
