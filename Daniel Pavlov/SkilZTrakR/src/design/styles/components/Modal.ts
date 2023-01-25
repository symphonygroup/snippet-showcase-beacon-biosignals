/* eslint-disable @typescript-eslint/unbound-method */
import { modalAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  header: {
    color: "greySolid.900",
    fontSize: "3xl",
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "auto",
    mr: 6,
    whiteSpace: "nowrap",
  },
  body: {
    color: "greySolid.700",
    p: 6,
    fontSize: "lg",
  },
  footer: {
    display: "flex",
    justifyContent: "right",
    gap: 2,
  },
  closeButton: {
    mt: 1,
    size: "sm",
  },
});

const sizes = {
  sm: {
    dialog: {
      maxW: 105,
    },
  },
  md: {
    dialog: {
      maxW: 155,
    },
  },
  lg: {
    dialog: {
      maxW: 230,
    },
  },
};

export const Modal = defineMultiStyleConfig({
  baseStyle,
  sizes,
  defaultProps: {
    size: "md",
  },
});
