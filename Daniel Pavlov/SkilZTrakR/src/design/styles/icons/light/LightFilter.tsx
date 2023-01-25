import * as React from "react";
import { SVGProps } from "react";
const SvgLightFilter = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11 17.75a.728.728 0 0 1-.75-.75.728.728 0 0 1 .75-.75h2c.217 0 .396.07.538.212a.731.731 0 0 1 .212.538c0 .217-.07.396-.212.538a.731.731 0 0 1-.538.212h-2ZM4 7.375a.706.706 0 0 1-.537-.225.74.74 0 0 1-.213-.525.726.726 0 0 1 .75-.75h16a.728.728 0 0 1 .75.75c0 .2-.07.375-.212.525a.71.71 0 0 1-.538.225H4Zm3 5.175a.726.726 0 0 1-.75-.75c0-.2.071-.375.213-.525A.706.706 0 0 1 7 11.05h10a.71.71 0 0 1 .538.225c.141.15.212.325.212.525a.728.728 0 0 1-.75.75H7Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgLightFilter;
