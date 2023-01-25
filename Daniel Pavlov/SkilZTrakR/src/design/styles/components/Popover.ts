import { popoverAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react';

import { shadows } from '../foundations';

// eslint-disable-next-line @typescript-eslint/unbound-method
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(popoverAnatomy.keys);

const borderColorDefault = 'greySolid.200';

const baseStyleContent = defineStyle({
  border: '1px solid',
  borderColor: borderColorDefault,
  borderRadius: 'md',
  boxShadow: shadows[6],
});

const baseStyleHeader = defineStyle({
  height: 9,
  borderColor: borderColorDefault,
  w: '100%',
  padding: 0,
});

const baseStyleBody = defineStyle({
  padding: 0,
});

const baseStyleCloseButton = defineStyle({
  position: 'absolute',
  paddingRight: 2,
  top: 1.5,
});

const baseStyleFooter = defineStyle({
  height: 9,
  borderColor: borderColorDefault,
  w: '100%',
  padding: 0,
});

const baseStyle = definePartsStyle({
  content: baseStyleContent,
  header: baseStyleHeader,
  closeButton: baseStyleCloseButton,
  body: baseStyleBody,
  footer: baseStyleFooter,
});

export const Popover = defineMultiStyleConfig({
  baseStyle,
});
