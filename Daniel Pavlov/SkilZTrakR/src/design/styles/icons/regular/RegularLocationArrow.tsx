import * as React from "react";
import { SVGProps } from "react";
const SvgRegularLocationArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m10.05 13.95-6.4-2.6a1.18 1.18 0 0 1-.462-.375A.93.93 0 0 1 3 10.4c0-.217.058-.408.175-.575.117-.167.275-.292.475-.375l15.3-5.675c.2-.083.392-.1.575-.05.183.05.342.142.475.275.133.133.225.292.275.475a.869.869 0 0 1-.05.575l-5.675 15.3a.952.952 0 0 1-.387.487 1.01 1.01 0 0 1-.538.163 1.07 1.07 0 0 1-.55-.163 1.062 1.062 0 0 1-.425-.487l-2.6-6.4Zm3.5 3.35L17.6 6.4 6.7 10.45l4.9 1.95 1.95 4.9Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgRegularLocationArrow;
