import * as React from "react";
import { SVGProps } from "react";
const SvgSolidArrowUp = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 20a.965.965 0 0 1-.712-.288A.965.965 0 0 1 11 19V7.825L6.125 12.7c-.2.2-.438.3-.713.3a.973.973 0 0 1-.712-.3.96.96 0 0 1-.3-.7c0-.267.1-.5.3-.7l6.6-6.6c.1-.1.208-.171.325-.213.117-.041.242-.062.375-.062s.263.02.388.062a.681.681 0 0 1 .312.213l6.6 6.6c.2.2.3.433.3.7 0 .267-.1.5-.3.7-.2.2-.438.3-.713.3a.973.973 0 0 1-.712-.3L13 7.825V19c0 .283-.096.52-.287.712A.968.968 0 0 1 12 20Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgSolidArrowUp;
