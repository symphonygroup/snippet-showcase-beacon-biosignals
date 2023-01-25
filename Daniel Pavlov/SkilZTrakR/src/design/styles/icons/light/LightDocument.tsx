import * as React from "react";
import { SVGProps } from "react";
const SvgLightDocument = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6.3 21.5c-.5 0-.925-.175-1.275-.525A1.736 1.736 0 0 1 4.5 19.7V4.3c0-.5.175-.925.525-1.275.35-.35.775-.525 1.275-.525h7.2a1.784 1.784 0 0 1 1.275.525l4.2 4.2A1.784 1.784 0 0 1 19.5 8.5v11.2c0 .5-.175.925-.525 1.275-.35.35-.775.525-1.275.525H6.3Zm7.2-13.9V4H6.3c-.067 0-.133.033-.2.1s-.1.133-.1.2v15.4c0 .067.033.133.1.2s.133.1.2.1h11.4c.067 0 .133-.033.2-.1s.1-.133.1-.2V8.5h-3.6a.869.869 0 0 1-.638-.263.867.867 0 0 1-.262-.637Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgLightDocument;
