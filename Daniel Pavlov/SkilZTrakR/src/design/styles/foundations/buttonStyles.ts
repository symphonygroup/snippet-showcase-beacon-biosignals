import { bodyL, bodyM, bodyS } from "./textStyles";

export const defaultButtonStyle = {
  borderRadius: "base",
  fontWeight: 500,
  color: "primary.500",
  _disabled: {
    bg: "greySolid.200",
    color: "greySolid.500",
    fontWeight: "semibold",
    pointerEvents: "none",
  },
};

export const smButtonStyle = {
  ...bodyS,
  h: 6,
  px: 2,
  py: 0.5,
};

export const mdButtonStyle = {
  ...bodyM,
  h: 8,
  px: 3,
  py: 1.5,
};

export const lgButtonStyle = {
  ...bodyL,
  height: 10,
  px: 4,
  py: 2.5,
};
