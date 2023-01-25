/* eslint-disable no-restricted-imports */
import {
  Checkbox as ChakraCheckbox,
  CheckboxProps as ChakraCheckboxProps,
  Icon,
} from '@chakra-ui/react';
import { forwardRef } from 'react';

import { RegularMinus } from '../../styles/icons/regular';
import { SolidCheck } from '../../styles/icons/solid';

export type CheckboxProps = ChakraCheckboxProps;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      size,
      isChecked,
      defaultChecked,
      checked,
      isIndeterminate,
      value,
      isDisabled,
      ...rest
    },
    ref
  ) => {
    const iconSize = size === 'lg' ? 5 : 3;

    const getIcon = () => {
      if (isChecked || defaultChecked || checked || (value && !isDisabled)) {
        return (
          <Icon
            as={SolidCheck}
            boxSize={iconSize}
            sx={{
              path: {
                fill: 'white',
              },
            }}
          />
        );
      }
      if (isIndeterminate) {
        return (
          <Icon
            as={RegularMinus}
            boxSize={iconSize}
            sx={{
              path: {
                fill: 'white',
              },
            }}
          />
        );
      }
      return undefined;
    };

    return (
      <ChakraCheckbox
        {...rest}
        size={size}
        icon={getIcon()}
        isChecked={isChecked}
        defaultChecked={defaultChecked}
        isIndeterminate={isIndeterminate}
        isDisabled={isDisabled}
        ref={ref}
      />
    );
  }
);

Checkbox.displayName = 'Checkbox';
