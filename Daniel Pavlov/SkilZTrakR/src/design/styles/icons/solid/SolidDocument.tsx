import * as React from "react";
import { SVGProps } from "react";
const SvgSolidDocument = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6 22c-.55 0-1.02-.196-1.412-.587A1.927 1.927 0 0 1 4 20V4c0-.55.196-1.021.588-1.413A1.925 1.925 0 0 1 6 2h7.175a1.978 1.978 0 0 1 1.4.575l4.85 4.85a1.978 1.978 0 0 1 .575 1.4V20c0 .55-.196 1.021-.587 1.413A1.928 1.928 0 0 1 18 22H6Zm7-14c0 .283.096.52.288.712A.965.965 0 0 0 14 9h4l-5-5v4Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgSolidDocument;
