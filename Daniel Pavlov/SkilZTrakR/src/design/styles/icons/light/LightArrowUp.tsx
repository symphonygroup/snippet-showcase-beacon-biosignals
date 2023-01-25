import * as React from "react";
import { SVGProps } from "react";
const SvgLightArrowUp = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 19.625a.706.706 0 0 1-.537-.225.74.74 0 0 1-.213-.525V7.25l-5.275 5.275a.72.72 0 0 1-.525.225.805.805 0 0 1-.55-.225.72.72 0 0 1-.225-.525c0-.2.075-.375.225-.525l6.475-6.45c.083-.1.18-.171.288-.213a.935.935 0 0 1 .675 0 .706.706 0 0 1 .287.213l6.475 6.45a.72.72 0 0 1 .225.525.72.72 0 0 1-.225.525.805.805 0 0 1-.55.225.72.72 0 0 1-.525-.225L12.75 7.25v11.625c0 .2-.07.375-.212.525a.71.71 0 0 1-.538.225Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgLightArrowUp;
