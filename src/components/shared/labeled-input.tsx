import clsx from 'clsx';
import { ChangeEventHandler, ComponentPropsWithoutRef, useId } from 'react';

// Refactored to be cleaner, less code, but still provide autocomplete and compile properly when this component is used elsewhere
type LabeledInputProps = ComponentPropsWithoutRef<'input'> & {
  label: string;
};

const LabeledInput = ({ label, id, onChange, ...props }: LabeledInputProps) => {
  id = useId() + id;

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} readOnly={!onChange} {...props} />
    </div>
  );
};

export default LabeledInput;
