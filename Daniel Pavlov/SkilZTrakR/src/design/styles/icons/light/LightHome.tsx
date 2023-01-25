import * as React from "react";
import { SVGProps } from "react";
const SvgLightHome = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6 19h3.35v-5.95h5.3V19H18v-9l-6-4.525L6 10v9Zm0 1.5c-.417 0-.77-.146-1.062-.438A1.444 1.444 0 0 1 4.5 19v-9c0-.233.054-.458.162-.675.109-.217.255-.392.438-.525l6-4.525c.133-.1.275-.171.425-.213A1.78 1.78 0 0 1 12 4c.167 0 .325.02.475.062.15.042.292.113.425.213l6 4.525c.183.133.329.308.437.525.109.217.163.442.163.675v9c0 .417-.146.77-.438 1.062A1.444 1.444 0 0 1 18 20.5h-4.85v-5.95h-2.3v5.95H6Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgLightHome;
