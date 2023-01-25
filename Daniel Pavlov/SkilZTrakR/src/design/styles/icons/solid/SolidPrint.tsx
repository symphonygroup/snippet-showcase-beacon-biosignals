import * as React from "react";
import { SVGProps } from "react";
const SvgSolidPrint = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M18 7H6V4a.97.97 0 0 1 .287-.713A.97.97 0 0 1 7 3h10c.283 0 .52.096.712.287.192.192.288.43.288.713v3Zm0 5.5c.283 0 .52-.096.712-.288A.965.965 0 0 0 19 11.5a.968.968 0 0 0-.288-.713A.967.967 0 0 0 18 10.5a.967.967 0 0 0-.712.287.968.968 0 0 0-.288.713c0 .283.096.52.288.712A.965.965 0 0 0 18 12.5ZM8 19h8v-4H8v4Zm0 2c-.55 0-1.02-.196-1.412-.587A1.927 1.927 0 0 1 6 19v-2H3a.965.965 0 0 1-.712-.288A.965.965 0 0 1 2 16v-5c0-.85.292-1.562.875-2.137S4.167 8 5 8h14c.85 0 1.563.288 2.138.863S22 10.15 22 11v5c0 .283-.096.52-.288.712A.965.965 0 0 1 21 17h-3v2c0 .55-.196 1.021-.587 1.413A1.928 1.928 0 0 1 16 21H8Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgSolidPrint;
