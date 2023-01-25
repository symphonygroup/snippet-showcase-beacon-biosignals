import { FormControlProps } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Control, UseControllerProps, useController } from 'react-hook-form';
import { GroupBase, OptionsOrGroups } from 'react-select';

import { Autocomplete } from '../../components/Autocomplete/Autocomplete';
import { FieldWrapper } from '../../components/FieldWrapper/FieldWrapper';

export type AutocompleteFieldProps = {
  label?: string;
  info?: string;
  placeholder?: string;
  name: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  control?: Control;
  options?: OptionsOrGroups<unknown, GroupBase<unknown>>;
  isMulti?: boolean;
  isClearable?: boolean;
  closeMenuOnSelect?: boolean;
  numOfLabels?: number;
  multiLabelIcon?: ReactNode;
} & FormControlProps &
  UseControllerProps;

export const AutocompleteField = ({
  label,
  info,
  placeholder,
  isDisabled,
  isRequired,
  options,
  isMulti,
  isClearable,
  closeMenuOnSelect,
  numOfLabels,
  multiLabelIcon,
  control,
  name,
  rules,
  ...rest
}: AutocompleteFieldProps) => {
  const {
    // issue: https://github.com/react-hook-form/react-hook-form/issues/7577
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    field: { value, onBlur, onChange },
    formState: { errors },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <FieldWrapper
      name={name}
      label={label}
      info={info}
      errors={errors}
      isRequired={!!rules?.required}
    >
      <Autocomplete
        {...rest}
        options={options}
        isMulti={isMulti}
        isClearable={isClearable}
        closeMenuOnSelect={closeMenuOnSelect}
        numOfLabels={numOfLabels}
        placeholder={placeholder}
        isDisabled={isDisabled}
        isInvalid={!!errors[name]}
        multiLabelIcon={multiLabelIcon}
        onBlur={onBlur}
        value={value as unknown}
        onChange={onChange}
        name={name}
      />
    </FieldWrapper>
  );
};
