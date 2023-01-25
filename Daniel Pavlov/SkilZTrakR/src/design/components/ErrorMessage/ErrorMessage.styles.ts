import { BoxProps, IconProps, TextProps } from '@chakra-ui/react';

export const boxWrapperStyle: BoxProps = {
  display: 'flex',
  alignItems: 'center',
  marginTop: 1,
};

export const iconStyle: IconProps = {
  color: 'red.500',
  minWidth: 3.5,
  height: 3.5,
};

export const textStyle: TextProps = {
  textStyle: 'bodyXS',
  color: 'red.700',
  fontWeight: 'normal',
  marginLeft: 1,
  noOfLines: 2,
};
