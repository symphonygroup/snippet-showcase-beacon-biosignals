import * as React from "react";
import { SVGProps } from "react";
const SvgLightLocationArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m10.375 13.6-5.85-2.375a.875.875 0 0 1-.4-.313.827.827 0 0 1 0-.95.878.878 0 0 1 .4-.312L18.5 4.425a.73.73 0 0 1 .475-.038c.15.042.283.121.4.238a.75.75 0 0 1 .238.387.68.68 0 0 1-.063.488L14.3 19.45a.8.8 0 0 1-.75.55.9.9 0 0 1-.475-.137.908.908 0 0 1-.35-.413l-2.35-5.85Zm3.125 3.75 4.15-11.025-11.025 4.15 4.9 1.975 1.975 4.9Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgLightLocationArrow;
