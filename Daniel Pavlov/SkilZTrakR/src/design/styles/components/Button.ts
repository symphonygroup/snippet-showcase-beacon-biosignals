import { StyleFunctionProps } from '@chakra-ui/react';

import {
  defaultButtonStyle,
  lgButtonStyle,
  mdButtonStyle,
  smButtonStyle,
} from '../foundations/buttonStyles';

export const Button = {
  baseStyle: {
    ...defaultButtonStyle,
  },
  sizes: {
    sm: {
      ...smButtonStyle,
    },
    md: {
      ...mdButtonStyle,
    },
    lg: {
      ...lgButtonStyle,
    },
  },
  variants: {
    solid: (props: StyleFunctionProps) => {
      const { colorScheme } = props;
      return {
        _active: {
          bg: `${colorScheme}.800`,
        },
        _hover: {
          bg: `${colorScheme}.700`,
        },
      };
    },
    outline: (props: StyleFunctionProps) => {
      const { colorScheme } = props;
      return {
        color: `${colorScheme}.500`,
        border: '1px solid',
        borderColor: `${colorScheme}.300`,
        _active: {
          bg: `${colorScheme}.200`,
        },
        _hover: {
          bg: `${colorScheme}.100`,
        },
      };
    },
    ghost: (props: StyleFunctionProps) => {
      const { colorScheme } = props;
      return {
        color: `${colorScheme}.500`,
        _hover: {
          bg: `${colorScheme}.100`,
        },
        _active: {
          bg: `${colorScheme}.200`,
        },
      };
    },
  },
};
