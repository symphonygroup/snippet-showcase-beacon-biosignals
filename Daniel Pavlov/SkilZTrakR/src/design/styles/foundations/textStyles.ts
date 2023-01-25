export const fontSizes = {
  xs: "11px",
  sm: "12px",
  md: "13px",
  lg: "14px",
  xl: "15px",
  "2xl": "16px",
  "3xl": "18px",
  "4xl": "20px",
  "5xl": "24px",
  "6xl": "28px",
  "7xl": "32px",
};

export const letterSpacings = {
  tightest: "-0.24px",
  tighter: "-0.15px",
  tight: "-0.08px",
  normal: "0",
  wideS: "0.07px",
  wide: "0.35px",
  wider: "0.37px",
  widest: "0.38px",
};

export const lineHeights = {
  normal: "16px",
  tall: "18px",
  taller: "20px",
  xl: "22px",
  "2xl": "24px",
  "3xl": "28px",
  "4xl": "30px",
  "5xl": "36px",
  "6xl": "42px",
  "7xl": "48px",
};

const h1 = {
  fontSize: fontSizes["7xl"],
  lineHeight: lineHeights["7xl"],
  letterSpacing: letterSpacings.wide,
};

const h2 = {
  fontSize: fontSizes["6xl"],
  lineHeight: lineHeights["6xl"],
  letterSpacing: letterSpacings.wide,
};

const h3 = {
  fontSize: fontSizes["5xl"],
  lineHeight: lineHeights["5xl"],
  letterSpacing: letterSpacings.wider,
};

const h4 = {
  fontSize: fontSizes["4xl"],
  lineHeight: lineHeights["4xl"],
  letterSpacing: letterSpacings.widest,
};

const h5 = {
  fontSize: fontSizes["3xl"],
  lineHeight: lineHeights["3xl"],
  letterSpacing: letterSpacings.tightest,
};

const h6 = {
  fontSize: fontSizes["2xl"],
  lineHeight: lineHeights["2xl"],
  letterSpacing: letterSpacings.tightest,
};

export const bodyL = {
  fontSize: fontSizes.xl,
  lineHeight: lineHeights.xl,
  letterSpacing: letterSpacings.tightest,
};

export const bodyM = {
  fontSize: fontSizes.lg,
  lineHeight: lineHeights.xl,
  letterSpacing: letterSpacings.tighter,
};

export const bodyS = {
  fontSize: fontSizes.md,
  lineHeight: lineHeights.taller,
  letterSpacing: letterSpacings.tighter,
};

const bodySUppercase = {
  fontSize: fontSizes.md,
  lineHeight: lineHeights.taller,
  letterSpacing: letterSpacings.wide,
};

const bodyXS = {
  fontSize: fontSizes.sm,
  lineHeight: lineHeights.tall,
  letterSpacing: letterSpacings.normal,
};

const bodyXSS = {
  fontSize: fontSizes.xs,
  lineHeight: lineHeights.normal,
  letterSpacing: letterSpacings.wideS,
};

export const headingSizes = {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
};

export const textStyles = {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  bodyL,
  bodyM,
  bodyS,
  bodySUppercase,
  bodyXS,
  bodyXSS,
};
