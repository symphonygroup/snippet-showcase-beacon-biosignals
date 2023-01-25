import * as React from "react";
import { SVGProps } from "react";
const SvgLightPlus = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 18.75a.728.728 0 0 1-.75-.75v-5.25H6a.726.726 0 0 1-.75-.75.728.728 0 0 1 .75-.75h5.25V6a.726.726 0 0 1 .75-.75.728.728 0 0 1 .75.75v5.25H18c.217 0 .396.07.538.212a.731.731 0 0 1 .212.538.728.728 0 0 1-.75.75h-5.25V18c0 .217-.07.396-.212.538a.731.731 0 0 1-.538.212Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgLightPlus;
