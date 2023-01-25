import * as React from "react";
import { SVGProps } from "react";
const SvgSolidLines = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4 18a.965.965 0 0 1-.712-.288A.965.965 0 0 1 3 17c0-.283.096-.52.288-.712A.965.965 0 0 1 4 16h16c.283 0 .52.096.712.288A.965.965 0 0 1 21 17c0 .283-.096.52-.288.712A.965.965 0 0 1 20 18H4Zm0-5a.965.965 0 0 1-.712-.288A.965.965 0 0 1 3 12c0-.283.096-.521.288-.713A.967.967 0 0 1 4 11h16c.283 0 .52.096.712.287.192.192.288.43.288.713s-.096.52-.288.712A.965.965 0 0 1 20 13H4Zm0-5a.967.967 0 0 1-.712-.287A.968.968 0 0 1 3 7c0-.283.096-.521.288-.713A.967.967 0 0 1 4 6h16c.283 0 .52.096.712.287.192.192.288.43.288.713a.968.968 0 0 1-.288.713A.967.967 0 0 1 20 8H4Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgSolidLines;
