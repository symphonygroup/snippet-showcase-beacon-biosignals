import Select, { Props as SelectProps } from 'react-select';

import { styles } from './Autocomplete.styles';
import {
  MultiValueContainer,
  MultiValueRemove,
  ValueContainer,
} from './utils/Containers';
import { ClearIndicator, DropdownIndicator } from './utils/Indicators';

export const Autocomplete = ({
  options,
  isMulti,
  numOfLabels = 2,
  multiLabelIcon,
  isClearable = true,
  closeMenuOnSelect = false,
  placeholder = 'Select...',
  isDisabled = false,
  isInvalid = false,
  ...rest
}: SelectProps) => {
  return (
    <Select
      {...rest}
      styles={styles}
      options={options}
      components={{
        ClearIndicator,
        DropdownIndicator,
        ValueContainer,
        MultiValueRemove,
        MultiValueContainer,
      }}
      numOfLabels={numOfLabels}
      multiLabelIcon={multiLabelIcon}
      isMulti={isMulti}
      isClearable={isClearable}
      closeMenuOnSelect={closeMenuOnSelect}
      placeholder={placeholder}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
    />
  );
};
