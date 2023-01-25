/* eslint-disable no-restricted-imports */
import {
  As,
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import { forwardRef } from "react";

import {
  calculateButtonStyles,
  calculateIconButtonStyles,
  calculateIconSize,
} from "./Button.styles";

export type ButtonProps = Omit<ChakraButtonProps, "leftIcon" | "rightIcon"> &
  ({ leftIcon?: As; rightIcon?: As } & (
    | {
        mainIcon?: undefined;
        "aria-label"?: undefined;
      }
    | { mainIcon: As; "aria-label": string }
  ));

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ leftIcon, rightIcon, mainIcon, size, children, ...rest }, ref) => {
    const isIconButton = !!mainIcon;
    return isIconButton ? (
      <IconButton
        ref={ref}
        size={size}
        aria-label={""}
        icon={<Icon as={mainIcon} boxSize={calculateIconSize(size)} />}
        {...calculateIconButtonStyles(size)}
        {...rest}
      />
    ) : (
      <ChakraButton
        {...rest}
        ref={ref}
        size={size}
        leftIcon={
          leftIcon ? (
            <Icon as={leftIcon} boxSize={calculateIconSize(size)} />
          ) : undefined
        }
        rightIcon={
          rightIcon ? (
            <Icon as={rightIcon} boxSize={calculateIconSize(size)} />
          ) : undefined
        }
        iconSpacing={1.5}
        {...calculateButtonStyles(!!leftIcon, !!rightIcon, size)}
      >
        {children}
      </ChakraButton>
    );
  },
);

Button.displayName = "Button";
