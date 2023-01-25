import { Center, CenterProps } from '@chakra-ui/react';

/**
 * This is an example of the wrapper component that encapsulates default styles so they are not repeated
 * Default styles can be overridden since the props interfaces are matching
 */
export const CenterWrapper = ({ children, ...rest }: CenterProps) => (
  <Center w="180px" h="80px" bg="red.200" {...rest}>
    {children}
  </Center>
);
