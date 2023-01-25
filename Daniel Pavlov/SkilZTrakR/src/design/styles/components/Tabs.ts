import { tabsAnatomy as parts } from "@chakra-ui/anatomy";
import { defineStyle } from "@chakra-ui/react";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

// eslint-disable-next-line @typescript-eslint/unbound-method
const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyleTablist = defineStyle((props) => {
  return {
    borderBottom: 0,
  };
});
const baseStyleTab = defineStyle((props) => {
  return {
    textStyle: "bodyL",
    fontSize: "xl",
  };
});

const baseStyle = definePartsStyle((props) => ({
  tablist: baseStyleTablist(props),
  tab: baseStyleTab(props),
}));

const variantLine = definePartsStyle((props) => {
  const { orientation } = props;
  const isVertical = orientation === "vertical";
  const borderProp = orientation === "vertical" ? "borderTop" : "borderBottom";
  const marginProp = isVertical ? "marginTop" : "marginBottom";

  return {
    tablist: {
      [borderProp]: "2px solid",
      borderColor: "inherit",
    },
    tab: {
      padding: 0,
      [borderProp]: "2px solid",
      borderColor: "transparent",
      [marginProp]: "-2px",
      color: "greySolid.800",
      _hover: {
        backgroundColor: "transparent",
      },
      _selected: {
        borderBottom: "2px solid",
        color: "primary.500",
        borderColor: "primary.500",
      },
      _focusVisible: {
        boxShadow: "none",
      },
      _disabled: {
        _active: { bg: "none" },
      },
    },
  };
});

const variantSolidRounded = definePartsStyle(({ isFitted }) => {
  return {
    tablist: {
      backgroundColor: "greyAlpha.100",
      borderRadius: "md",
      padding: 0.5,
      width: isFitted ? "100%" : "fit-content",
    },
    tab: {
      fontWeight: "semibold",
      color: "greySolid.600",
      borderRadius: "base",
      px: 3,
      py: 1,
      _selected: {
        backgroundColor: "white",
        color: "greySolid.900",
        _hover: {
          backgroundColor: "white",
        },
      },
      _hover: {
        backgroundColor: "greyAlpha.100",
        color: "greySolid.900",
      },
    },
  };
});

const sizes = {
  md: definePartsStyle({
    tab: {
      py: 1,
      px: 2,
      fontSize: "xl",
      lineHeight: "xl",
      letterSpacing: "tightest",
      fontWeight: "semibold",
    },
    tablist: {
      border: 0,
    },
  }),
};

const variants = {
  line: variantLine,
  "solid-rounded": variantSolidRounded,
};

export const Tabs = defineMultiStyleConfig({
  baseStyle,
  sizes,
  variants,
  defaultProps: {
    size: "md",
    variant: "line",
    colorScheme: "primary",
  },
});
