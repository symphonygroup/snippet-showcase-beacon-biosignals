import * as React from "react";
import { SVGProps } from "react";
const SvgLightStar = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m12.002 16.3 4.246 2.688-1.127-5.06 3.849-3.489-5.06-.45L12 5.275 10.09 9.98l-5.06.45 3.849 3.488L7.75 18.98l4.25-2.68Zm-5.17 3.258.003-.001-.002.002ZM12 18.075l4.365 2.762c.8.506 1.777-.242 1.567-1.189l-1.157-5.194 3.86-3.5c.705-.638.326-1.849-.6-1.926l-5.08-.451-1.987-4.908a1.034 1.034 0 0 0-1.936 0L9.045 8.566l-5.08.451c-.926.077-1.305 1.288-.6 1.926l3.86 3.5-1.157 5.194c-.21.947.768 1.695 1.567 1.189L12 18.074Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgLightStar;
