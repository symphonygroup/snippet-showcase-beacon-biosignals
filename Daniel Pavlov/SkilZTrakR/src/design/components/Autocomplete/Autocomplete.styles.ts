import { GroupBase, StylesConfig } from "react-select";

import { colors, fontSizes, lineHeights } from "../../styles/foundations";

const containerMinHeight = "var(--chakra-space-7-5)";

export const styles: StylesConfig<unknown, false, GroupBase<unknown>> = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    borderColor: state.isFocused
      ? colors.primary[500]
      : state.isDisabled
      ? colors.greySolid[500]
      : state.selectProps.isInvalid
      ? colors.red[500]
      : colors.greySolid[500],
    color: state.isDisabled ? colors.greySolid[500] : colors.greySolid[900],
    outlineColor: state.isFocused ? colors.primary[500] : colors.greySolid[300],
    background: state.isDisabled
      ? colors.light.lightGrey
      : state.selectProps.isInvalid
      ? colors.red[100]
      : colors.light.white,
    borderRadius: 4,
    minHeight: containerMinHeight,
    padding: 0,
    boxShadow: state.isFocused ? "var(--chakra-shadows-5)" : "none",
    ":hover": {
      borderColor: state.selectProps.isInvalid
        ? colors.red[500]
        : colors.primary[500],
    },
  }),
  input: (styles) => {
    return {
      ...styles,
      fontSize: fontSizes.lg,
      lineHeight: lineHeights.xl,
    };
  },
  placeholder: (styles) => {
    return {
      ...styles,
      fontSize: fontSizes.lg,
      lineHeight: lineHeights.xl,
      color: colors.greySolid[500],
    };
  },
  container: (styles, state) => {
    return {
      ...styles,
      borderColor: state.isFocused
        ? colors.primary[500]
        : colors.greySolid[300],
      outlineColor: state.isFocused
        ? colors.primary[500]
        : colors.greySolid[300],
      minHeight: containerMinHeight,
      ":focus": {
        outline: "none",
      },
    };
  },
  valueContainer: (styles, state) => {
    return {
      ...styles,
      minHeight: containerMinHeight,
      fontSize: fontSizes.lg,
      padding: "0px",
      paddingBottom: "0px",
      paddingLeft:
        state.isMulti && state.hasValue ? "0px" : "var(--chakra-space-2)",
    };
  },
  indicatorsContainer: (styles) => {
    return {
      ...styles,
      minHeight: containerMinHeight,
      padding: "0px",
    };
  },
  multiValue: (styles, state) => {
    return {
      ...styles,
      backgroundColor: state.isDisabled
        ? colors.greySolid[200]
        : colors.primary[100],
      color: state.isDisabled ? colors.greySolid[400] : colors.greySolid[900],
      borderRadius: "var(--chakra-radii-base)",
    };
  },
  multiValueRemove: (styles, state) => {
    return {
      ...styles,
      display: state.isDisabled ? "none" : "flex",
      backgroundColor: "none",
      paddingLeft: "0px",
      ":hover": {
        backgroundColor: "none",
      },
    };
  },
  multiValueLabel: (styles, state) => {
    return {
      ...styles,
      color: state.isDisabled ? colors.greySolid[400] : colors.greySolid[900],
      paddingRight: "var(--chakra-space-1-5)",
    };
  },
  indicatorSeparator: (styles) => {
    return {
      ...styles,
      display: "none",
    };
  },
  clearIndicator: (styles) => {
    return {
      ...styles,
      padding:
        "var(--chakra-space-1) var(--chakra-space-0-5) var(--chakra-space-1) var(--chakra-space-1)",
      cursor: "pointer",
    };
  },
  dropdownIndicator: (styles) => {
    return {
      ...styles,
      padding:
        "var(--chakra-space-1) var(--chakra-space-2) var(--chakra-space-1) 0px",
      cursor: "pointer",
    };
  },
  menu: (styles) => {
    return {
      ...styles,
      background: colors.light.white,
      border: "1px solid",
      borderColor: colors.greySolid[100],
      boxShadow: "var(--chakra-shadows-4)",
      borderRadius: "var(--chakra-radii-md)",
      fontSize: fontSizes.md,
      lineHeight: lineHeights.taller,
      color: colors.greySolid[900],
    };
  },
  option: (styles, state) => {
    return {
      ...styles,
      margin: "0px var(--chakra-space-1-5)",
      width: "calc(100% - var(--chakra-space-3))",
      cursor: "pointer",
      backgroundColor: state.isSelected
        ? colors.primary[100]
        : state.isFocused
        ? colors.light.appBg
        : colors.light.white,
      color: colors.greySolid[900],
      borderRadius: "var(--chakra-radii-md)",
      ":hover": {
        background: state.isFocused ? colors.light.appBg : colors.light.white,
      },
    };
  },
};
