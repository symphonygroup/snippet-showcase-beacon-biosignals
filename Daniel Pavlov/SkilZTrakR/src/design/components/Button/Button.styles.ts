// eslint-disable-next-line no-restricted-imports
import { ButtonProps, ResponsiveValue } from "@chakra-ui/react";

export const calculateIconSize = (size?: ResponsiveValue<string>) => {
  switch (size) {
    case "sm":
      return 4.5;
    case "lg":
      return 6;
    default:
      return 5;
  }
};

export const calculateIconButtonStyles = (
  size: ResponsiveValue<string> = "md",
) => {
  return iconSizeStyles[size as string].mainIcon;
};

export const calculateButtonStyles = (
  isLeftIcon: boolean,
  isRightIcon: boolean,
  size: ResponsiveValue<string> = "md",
) => {
  const icon =
    isLeftIcon && isRightIcon
      ? "both-sides"
      : isLeftIcon
      ? "left"
      : isRightIcon
      ? "right"
      : "no-icon";
  return getStyleForIconSize(icon, size as string);
};

const getStyleForIconSize = (
  icon: "left" | "right" | "both-sides" | "no-icon",
  size: string,
) => {
  switch (icon) {
    case "both-sides":
      return iconSizeStyles[size].bothIcons;
    case "left":
      return iconSizeStyles[size].leftIcon;
    case "right":
      return iconSizeStyles[size].rightIcon;
  }
};

type DifferentButtonIcons = {
  leftIcon: ButtonProps;
  rightIcon: ButtonProps;
  bothIcons: ButtonProps;
  mainIcon: ButtonProps;
};

const iconSizeStyles: Record<string, DifferentButtonIcons> = {
  sm: {
    leftIcon: { paddingLeft: 1.5 },
    rightIcon: { paddingRight: 1 },
    bothIcons: { paddingRight: 1, paddingLeft: 1.5 },
    mainIcon: { padding: 0, minWidth: 6, width: 6 },
  },
  md: {
    leftIcon: { paddingLeft: 2.5 },
    rightIcon: { paddingRight: 1.5 },
    bothIcons: { paddingRight: 1.5, paddingLeft: 2.5 },
    mainIcon: { padding: 0, minWidth: 8, width: 8 },
  },
  lg: {
    leftIcon: { paddingLeft: 3.5 },
    rightIcon: { paddingRight: 2 },
    bothIcons: { paddingRight: 2, paddingLeft: 3.5 },
    mainIcon: { padding: 0, minWidth: 10, width: 10 },
  },
};
