import { Icon } from '@chakra-ui/react';
import {
  ClearIndicatorProps,
  DropdownIndicatorProps,
  GroupBase,
  components,
} from 'react-select';

import { LightArrowChevronDown, LightClose } from '../../../styles/icons/light';

export const ClearIndicator = ({
  children,
  ...props
}: ClearIndicatorProps<unknown, boolean, GroupBase<unknown>>) => (
  <components.ClearIndicator {...props}>
    <Icon as={LightClose} color="greySolid.500" w={5} h={5} /> {children}
  </components.ClearIndicator>
);

export const DropdownIndicator = ({
  children,
  ...props
}: DropdownIndicatorProps<unknown, boolean, GroupBase<unknown>>) => (
  <components.DropdownIndicator {...props}>
    <Icon as={LightArrowChevronDown} color="greySolid.500" w={5} h={5} />
    {children}
  </components.DropdownIndicator>
);
