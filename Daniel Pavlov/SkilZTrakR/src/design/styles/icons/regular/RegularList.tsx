import * as React from "react";
import { SVGProps } from "react";
const SvgRegularList = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M18 13H6a.968.968 0 0 1-.713-.288A.967.967 0 0 1 5 12a.97.97 0 0 1 .287-.713A.97.97 0 0 1 6 11h12c.283 0 .52.096.712.287.192.192.288.43.288.713s-.096.52-.288.712A.965.965 0 0 1 18 13Zm-2 4H4a.965.965 0 0 1-.712-.288A.965.965 0 0 1 3 16c0-.283.096-.521.288-.713A.967.967 0 0 1 4 15h12c.283 0 .52.096.712.287.192.192.288.43.288.713s-.096.52-.288.712A.965.965 0 0 1 16 17Zm4-8H8a.968.968 0 0 1-.713-.288A.967.967 0 0 1 7 8a.97.97 0 0 1 .287-.713A.97.97 0 0 1 8 7h12c.283 0 .52.096.712.287.192.192.288.43.288.713s-.096.52-.288.712A.965.965 0 0 1 20 9Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgRegularList;
