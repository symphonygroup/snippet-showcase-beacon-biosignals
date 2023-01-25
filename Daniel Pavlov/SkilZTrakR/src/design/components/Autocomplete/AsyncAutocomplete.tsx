import { Props as SelectProps } from 'react-select';
import AsyncSelect from 'react-select/async';

import { styles } from './Autocomplete.styles';
import {
  MultiValueContainer,
  MultiValueRemove,
  ValueContainer,
} from './utils/Containers';
import { ClearIndicator, DropdownIndicator } from './utils/Indicators';

export const AsyncAutocomplete = ({
  options,
  isMulti,
  numOfLabels = 2,
  multiLabelIcon,
  isClearable = true,
  closeMenuOnSelect = false,
  placeholder = 'Select...',
  isDisabled = false,
  isInvalid = false,
  loadOptions,
}: SelectProps) => {
  return (
    <AsyncSelect
      styles={styles}
      defaultOptions={options}
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
      loadOptions={loadOptions}
    />
  );
};
