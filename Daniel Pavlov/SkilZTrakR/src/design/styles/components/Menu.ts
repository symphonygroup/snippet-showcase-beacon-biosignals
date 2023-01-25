import { menuAnatomy as parts } from '@chakra-ui/anatomy';
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from '@chakra-ui/styled-system';

import { shadows } from '../foundations';

// eslint-disable-next-line @typescript-eslint/unbound-method
const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyleList = defineStyle({
  border: '1px solid',
  borderColor: 'greySolid.200',
  borderRadius: 'md',
  boxShadow: shadows[6],
  padding: 2,
});

const baseStyleItem = defineStyle({
  textStyle: 'bodyS',
  height: 8,
  color: 'greySolid.900',
  px: 2,
  _hover: {
    backgroundColor: 'light.appBg',
    borderRadius: 'base',
  },
});

const baseStyleGroupTitle = defineStyle({
  textStyle: 'bodyS',
  height: 8,
  color: 'greySolid.900',
  fontWeight: 'semibold',
  mx: 2,
  my: 0,
  pt: 1.5,
});

const baseStyleCommand = defineStyle({
  textStyle: 'bodyS',
  color: 'greySolid.600',
});

const baseStyleDivider = defineStyle({
  borderColor: 'greySolid.400',
});

const baseStyle = definePartsStyle({
  list: baseStyleList,
  item: baseStyleItem,
  groupTitle: baseStyleGroupTitle,
  command: baseStyleCommand,
  divider: baseStyleDivider,
});

export const Menu = defineMultiStyleConfig({
  baseStyle,
});
