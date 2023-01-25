import { FormControlProps, Input, ResponsiveValue } from '@chakra-ui/react';
import { FieldWrapper } from '../FieldWrapper/FieldWrapper';
import { forwardRef } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

export type InputFieldProps = {
  label?: string;
  info?: string;
  placeholder?: string;
  errors: FieldErrors;
  size?: ResponsiveValue<string>;
  disabled?: boolean;
  readOnly?: boolean;
  isRequired?: boolean;
} & ReturnType<UseFormRegister<FieldValues>> &
  FormControlProps;

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      info,
      errors,
      isRequired,
      placeholder,
      disabled,
      readOnly,
      size,
      name,
      onChange,
      onBlur,
      ...rest
    },
    ref
  ) => (
    <FieldWrapper
      name={name}
      label={label}
      info={info}
      errors={errors}
      isRequired={isRequired}
    >
      <Input
        {...rest}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        isInvalid={!!errors[name]}
        readOnly={readOnly}
        size={size}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
      />
    </FieldWrapper>
  )
);
