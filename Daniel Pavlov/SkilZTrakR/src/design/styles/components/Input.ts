import { inputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

import { colors, letterSpacings } from '../foundations';

// eslint-disable-next-line @typescript-eslint/unbound-method
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const defaultBorder = `1px solid ${colors.primary[500]}`;
const greyBorder = `1px solid ${colors.greySolid[500]}`;

const variantDefault = () => ({
  field: {
    paddingX: 1.5,
    paddingY: 2,
    borderRadius: 'base',
    color: 'greySolid.900',
    _hover: {
      border: defaultBorder,
    },
    _focus: {
      border: defaultBorder,
      boxShadow: 'var(--chakra-shadows-5)',
    },
    _placeholder: {
      color: 'greySolid.500',
      letterSpacing: letterSpacings.tight,
    },
    _invalid: {
      background: 'red.100',
      border: `1px solid ${colors.red[500]}`,
    },
    _disabled: {
      color: 'greySolid.500',
      background: 'light.lightGrey',
      border: greyBorder,
      _hover: {
        border: greyBorder,
      },
    },
    _readOnly: {
      border: greyBorder,
      _hover: {
        border: greyBorder,
      },
      _focus: {
        border: greyBorder,
        boxShadow: '0px 0px 0px 0px',
      },
    },
  },
});

const baseStyle = definePartsStyle({
  // define the part you're going to style
  field: {
    border: greyBorder,
    fontWeight: 400,
  },
});

const sizes = {
  md: {
    field: {
      height: 8,
      pl: 2,
      pr: 2,
    },
  },
  lg: {
    field: {
      height: 10,
      pl: 2.5,
      pr: 2.5,
    },
  },
};

export const Input = defineMultiStyleConfig({
  baseStyle,
  variants: {
    default: variantDefault,
  },
  sizes,
  defaultProps: {
    variant: 'default',
    size: 'md',
  },
});
