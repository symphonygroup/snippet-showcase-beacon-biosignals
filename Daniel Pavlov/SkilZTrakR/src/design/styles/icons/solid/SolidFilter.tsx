import * as React from "react";
import { SVGProps } from "react";
const SvgSolidFilter = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11 18a.965.965 0 0 1-.712-.288A.965.965 0 0 1 10 17c0-.283.096-.52.288-.712A.965.965 0 0 1 11 16h2c.283 0 .521.096.713.288A.967.967 0 0 1 14 17c0 .283-.096.52-.287.712A.968.968 0 0 1 13 18h-2ZM4 8a.967.967 0 0 1-.712-.287A.968.968 0 0 1 3 7c0-.283.096-.521.288-.713A.967.967 0 0 1 4 6h16c.283 0 .52.096.712.287.192.192.288.43.288.713a.968.968 0 0 1-.288.713A.967.967 0 0 1 20 8H4Zm3 5a.968.968 0 0 1-.713-.288A.967.967 0 0 1 6 12a.97.97 0 0 1 .287-.713A.97.97 0 0 1 7 11h10c.283 0 .52.096.712.287.192.192.288.43.288.713s-.096.52-.288.712A.965.965 0 0 1 17 13H7Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgSolidFilter;
