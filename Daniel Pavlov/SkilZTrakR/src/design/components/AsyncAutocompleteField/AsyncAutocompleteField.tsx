import { FormControlProps } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Control, UseControllerProps, useController } from 'react-hook-form';
import { GroupBase, OptionsOrGroups } from 'react-select';

import { AsyncAutocomplete } from '../../components/Autocomplete/AsyncAutocomplete';
import { FieldWrapper } from '../../components/FieldWrapper/FieldWrapper';

export type AsyncAutocompleteFieldProps = {
  label?: string;
  info?: string;
  placeholder?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  name: string;
  control?: Control;
  options?: OptionsOrGroups<unknown, GroupBase<unknown>>;
  isMulti?: boolean;
  isClearable?: boolean;
  closeMenuOnSelect?: boolean;
  numOfLabels?: number;
  multiLabelIcon?: ReactNode;
  loadOptions?: (
    inputValue: string,
    cbFunction: (options: OptionsOrGroups<unknown, GroupBase<unknown>>) => void
  ) => void;
} & UseControllerProps &
  FormControlProps;

export const AsyncAutocompleteField = ({
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
  loadOptions,
  name,
  rules,
  control,
  ...rest
}: AsyncAutocompleteFieldProps) => {
  const {
    // issue: https://github.com/react-hook-form/react-hook-form/issues/7577
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    field: { value, onChange, onBlur },
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
      isRequired={isRequired}
    >
      <AsyncAutocomplete
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
        loadOptions={loadOptions}
        onBlur={onBlur}
        value={value as unknown}
        onChange={onChange}
      />
    </FieldWrapper>
  );
};
