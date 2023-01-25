import { Box, BoxProps, Icon, Text } from '@chakra-ui/react';
import { SolidInfo } from '../../styles/icons/solid';
import { boxWrapperStyle, iconStyle, textStyle } from './ErrorMessage.styles';

export type ErrorMessageProps = BoxProps & {
  message: string;
};

export const ErrorMessage = ({ message, ...rest }: ErrorMessageProps) => (
  <Box {...boxWrapperStyle} {...rest}>
    <Icon as={SolidInfo} {...iconStyle} />
    <Text {...textStyle}>{message}</Text>
  </Box>
);
