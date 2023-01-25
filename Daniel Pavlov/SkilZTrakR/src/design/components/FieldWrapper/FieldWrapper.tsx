import { FormControl } from '@chakra-ui/react';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { Label } from '../Label/Label';
import { ReactElement } from 'react';
import { FieldErrors } from 'react-hook-form';

export type FieldWrapperProps = {
  name: string;
  label?: string;
  info?: string;
  errors: FieldErrors;
  isRequired?: boolean;
  children: ReactElement;
};

export const FieldWrapper = ({
  name,
  label,
  info,
  errors,
  isRequired,
  children,
}: FieldWrapperProps) => (
  <FormControl isInvalid={!errors[name]} isRequired={isRequired}>
    {label ? <Label label={label} info={info} /> : null}
    {children}
    {errors[name] ? (
      <ErrorMessage message={errors[name]?.message?.toString() ?? ''} />
    ) : null}
  </FormControl>
);
