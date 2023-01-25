import {
  Alert,
  AlertDescription,
  AlertStatus,
  AlertTitle,
  Box,
  HStack,
  Icon,
  RenderProps,
  UseToastOptions as UseChakraToastOptions,
  VStack,
  useToast as useChakraToast,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

import { Button, ButtonProps } from '../components/Button/Button';
import {
  SolidCheckCircle,
  SolidClose,
  SolidError,
  SolidInfo,
  SolidWarningTriangle,
} from '../styles/icons/solid';

type DisplayIconProps = {
  status?: AlertStatus;
  icon: ReactNode;
};

const DisplayIcon = ({ status, icon }: DisplayIconProps): JSX.Element => {
  if (icon) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{icon}</>;
  }

  switch (status) {
    case 'info':
      return <Icon as={SolidInfo} color="blue.500" boxSize={5} />;
    case 'warning':
      return <Icon as={SolidWarningTriangle} color="yellow.500" boxSize={5} />;
    case 'error':
      return <Icon as={SolidError} color="red.500" boxSize={5} />;
    default:
      return <Icon as={SolidCheckCircle} color="green.500" boxSize={5} />;
  }
};

export type UseToastOptions = UseChakraToastOptions & {
  width?: string;
  displayButtons?: boolean;
  primaryAction?: ButtonProps;
  secondaryAction?: ButtonProps;
};

export const useToast = () => {
  const toast = useChakraToast();

  return ({
    position,
    duration,
    title,
    description,
    isClosable,
    status,
    icon,
    id,
    onCloseComplete,
    containerStyle,
    width,
    variant,
    primaryAction,
    secondaryAction,
  }: UseToastOptions) => {
    toast({
      position: position ?? 'top-right',
      duration: duration,
      title: title,
      description: description,
      isClosable: isClosable ?? true,
      status: status,
      icon: icon,
      id: id,
      onCloseComplete: onCloseComplete,
      containerStyle: containerStyle,
      render: ({ isClosable, onClose }: RenderProps) => {
        return (
          <Alert width={width} variant={variant} status={status}>
            <HStack spacing={2} align="start" width="full">
              <Box>
                <DisplayIcon status={status} icon={icon} />
              </Box>

              <VStack spacing={1} align="start" width="full">
                <AlertTitle>{title}</AlertTitle>
                <AlertDescription>{description}</AlertDescription>

                {primaryAction || secondaryAction ? (
                  <HStack spacing="3" paddingTop="1">
                    {primaryAction ? (
                      <Button
                        color="graySolid.800"
                        size="sm"
                        variant="outline"
                        {...primaryAction}
                      >
                        {primaryAction.children}
                      </Button>
                    ) : null}
                    {secondaryAction ? (
                      <Button
                        color="graySolid.800"
                        size="sm"
                        variant="ghost"
                        {...secondaryAction}
                      >
                        {secondaryAction.children}
                      </Button>
                    ) : null}
                  </HStack>
                ) : null}
              </VStack>

              {isClosable ? (
                <Button
                  variant="ghost"
                  size="md"
                  color="greySolid.800"
                  boxSize={5}
                  onClick={onClose}
                  mainIcon={SolidClose}
                  aria-label="Solid close"
                />
              ) : null}
            </HStack>
          </Alert>
        );
      },
    });
  };
};
