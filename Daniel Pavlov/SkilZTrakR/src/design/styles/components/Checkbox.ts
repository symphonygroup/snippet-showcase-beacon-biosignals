import { checkboxAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";

// eslint-disable-next-line @typescript-eslint/unbound-method
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(checkboxAnatomy.keys);

const baseStyle = definePartsStyle(
  ({ isDisabled, isChecked, checked, defaultCheck, isIndeterminate }) => {
    return {
      control: {
        background: "white",
        border: "1px solid",
        borderColor:
          checked || isChecked || defaultCheck || isIndeterminate
            ? "primary.500 !important"
            : "greySolid.400 !important",
        borderRadius: "base",

        _disabled: {
          borderColor:
            checked || isChecked || defaultCheck || isIndeterminate
              ? "greySolid.500 !important"
              : "greySolid.400 !important",
          background:
            isChecked || defaultCheck || isIndeterminate
              ? "greySolid.500 !important"
              : "greySolid.200 !important",
        },

        _checked: {
          background: isDisabled ? "greySolid.500" : "primary.500",
          borderColor: isDisabled
            ? "greySolid.500! important"
            : "primary.500 !important",
        },

        _hover: {
          boxShadow: 5,
          borderColor: isDisabled
            ? "greySolid.500 !important"
            : "primary.500 !important",
          _disabled: {
            boxShadow: "none",

            borderColor:
              checked || isChecked || defaultCheck || isIndeterminate
                ? "greySolid.500 !important"
                : "greySolid.400 !important",
          },

          _checked: {
            borderColor: isDisabled
              ? "greySolid.500 !important"
              : "primary.500 !important",
          },
        },
      },
      label: {
        fontWeight: "normal",
        fontSize: "lg",
        lineHeight: "xl",
        color: "greySolid.900",
      },
    };
  },
);

const sizes = {
  lg: definePartsStyle({
    control: defineStyle({
      boxSize: 5,
    }),
  }),
};

export const Checkbox = defineMultiStyleConfig({ baseStyle, sizes });
