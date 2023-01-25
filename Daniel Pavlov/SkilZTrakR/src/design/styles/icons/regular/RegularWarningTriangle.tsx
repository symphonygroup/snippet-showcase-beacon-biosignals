import * as React from "react";
import { SVGProps } from "react";
const SvgRegularWarningTriangle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M2.725 21a.907.907 0 0 1-.85-.5.978.978 0 0 1 0-1l9.25-16c.183-.333.475-.5.875-.5s.692.167.875.5l9.25 16a.978.978 0 0 1 0 1 .907.907 0 0 1-.85.5H2.725ZM12 10a.967.967 0 0 0-.712.287A.968.968 0 0 0 11 11v3c0 .283.096.52.288.712A.965.965 0 0 0 12 15a.968.968 0 0 0 .713-.288A.967.967 0 0 0 13 14v-3a.97.97 0 0 0-.287-.713A.97.97 0 0 0 12 10Zm0 8a.968.968 0 0 0 .713-.288A.967.967 0 0 0 13 17a.967.967 0 0 0-.287-.712A.968.968 0 0 0 12 16a.965.965 0 0 0-.712.288A.965.965 0 0 0 11 17c0 .283.096.52.288.712A.965.965 0 0 0 12 18Zm-7.55 1h15.1L12 6 4.45 19Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgRegularWarningTriangle;
