import * as React from "react";
import { SVGProps } from "react";
const SvgRegularStar = (props: SVGProps<SVGSVGElement>) => (
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
      d="m12.002 15.709 3.496 2.213-.928-4.169 3.217-2.917-4.226-.375-1.562-3.856-1.56 3.845-4.226.375 3.217 2.917-.93 4.174 3.502-2.207Zm5.93 3.94c.21.946-.768 1.694-1.567 1.188L12 18.075l-4.365 2.75c-.8.507-1.777-.241-1.567-1.188l1.157-5.194-3.86-3.5c-.705-.638-.326-1.849.6-1.926l5.08-.451 1.987-4.897a1.034 1.034 0 0 1 1.936 0l1.988 4.908 5.08.451c.925.077 1.304 1.288.6 1.926l-3.86 3.5 1.156 5.194Zm-6.818-15.23Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgRegularStar;
