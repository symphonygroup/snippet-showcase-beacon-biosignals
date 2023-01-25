import * as React from "react";
import { SVGProps } from "react";
const SvgLightWarningTriangle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3.425 20.5c-.35 0-.608-.15-.775-.45a.873.873 0 0 1 0-.9l8.55-14.8c.183-.3.45-.45.8-.45.35 0 .617.15.8.45l8.55 14.8c.167.3.167.6 0 .9-.167.3-.425.45-.775.45H3.425ZM12 10.2a.728.728 0 0 0-.75.75v3.5c0 .2.071.375.213.525.141.15.32.225.537.225a.71.71 0 0 0 .538-.225.741.741 0 0 0 .212-.525v-3.5a.73.73 0 0 0-.212-.538A.731.731 0 0 0 12 10.2Zm0 7.6a.779.779 0 0 0 .575-.225A.779.779 0 0 0 12.8 17a.779.779 0 0 0-.225-.575A.779.779 0 0 0 12 16.2a.779.779 0 0 0-.575.225.779.779 0 0 0-.225.575c0 .233.075.425.225.575.15.15.342.225.575.225ZM4.45 19h15.1L12 6 4.45 19Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgLightWarningTriangle;
