import { alertAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

// eslint-disable-next-line @typescript-eslint/unbound-method
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(alertAnatomy.keys);

const baseStyle = definePartsStyle(({ status }) => {
  const statusStyles = () => {
    switch (status) {
      case "info":
        return {
          background: "blue.100",
          borderColor: "blue.300",
        };
      case "warning":
        return {
          background: "yellow.100",
          borderColor: "yellow.300",
        };
      case "error":
        return {
          background: "red.100",
          borderColor: "red.300",
        };

      default:
        return {
          background: "green.100",
          borderColor: "green.300",
        };
    }
  };

  return {
    container: {
      border: "1px solid",
      borderRadius: "lg",
      padding: 3,
      ...statusStyles(),
    },
    title: {
      fontWeight: "bold",
      fontSize: "xl",
      lineHeight: "xl",
      letterSpacing: "tightest",
      color: "greySolid.900",
    },
    description: {
      fontWeight: "normal",
      fontSize: "md",
      lineHeight: "taller",
      color: "greySolid.800",
    },
  };
});

export const Alert = defineMultiStyleConfig({ baseStyle });
