import * as React from "react";
import { SVGProps } from "react";
const SvgLightLink = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7 16.55c-1.25 0-2.32-.446-3.212-1.337C2.896 14.321 2.45 13.25 2.45 12s.446-2.321 1.338-3.213C4.679 7.896 5.75 7.45 7 7.45h3.05a.71.71 0 0 1 .538.225c.141.15.212.325.212.525a.728.728 0 0 1-.75.75H7c-.833 0-1.55.3-2.15.9-.6.6-.9 1.317-.9 2.15s.3 1.55.9 2.15c.6.6 1.317.9 2.15.9h3.05a.73.73 0 0 1 .538.212.731.731 0 0 1 .212.538c0 .2-.07.375-.212.525a.71.71 0 0 1-.538.225H7Zm2-3.8a.726.726 0 0 1-.75-.75.727.727 0 0 1 .75-.75h6a.73.73 0 0 1 .538.212.731.731 0 0 1 .212.538.728.728 0 0 1-.75.75H9Zm4.95 3.8a.706.706 0 0 1-.537-.225.74.74 0 0 1-.213-.525.727.727 0 0 1 .75-.75H17c.833 0 1.55-.3 2.15-.9.6-.6.9-1.317.9-2.15s-.3-1.55-.9-2.15c-.6-.6-1.317-.9-2.15-.9h-3.05a.726.726 0 0 1-.75-.75c0-.2.071-.375.213-.525a.706.706 0 0 1 .537-.225H17c1.25 0 2.32.446 3.212 1.337.892.892 1.338 1.963 1.338 3.213s-.446 2.321-1.338 3.213c-.891.891-1.962 1.337-3.212 1.337h-3.05Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgLightLink;
