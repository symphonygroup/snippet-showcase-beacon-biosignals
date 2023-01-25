import * as React from "react";
import { SVGProps } from "react";
const SvgLightArrowDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 19.25a.936.936 0 0 1-.337-.062.704.704 0 0 1-.288-.213L4.9 12.525A.72.72 0 0 1 4.675 12c0-.2.075-.383.225-.55a.791.791 0 0 1 .538-.225.79.79 0 0 1 .537.225l5.275 5.3V5.125a.728.728 0 0 1 .75-.75.71.71 0 0 1 .538.225c.141.15.212.325.212.525V16.75l5.275-5.3a.79.79 0 0 1 .537-.225c.192 0 .371.075.538.225.15.167.225.35.225.55a.72.72 0 0 1-.225.525l-6.475 6.45a.706.706 0 0 1-.287.213.944.944 0 0 1-.338.062Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgLightArrowDown;
