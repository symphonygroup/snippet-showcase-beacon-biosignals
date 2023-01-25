import * as React from "react";
import { SVGProps } from "react";
const SvgLightList = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M18 12.75H6a.726.726 0 0 1-.75-.75.728.728 0 0 1 .75-.75h12c.217 0 .396.07.538.212a.731.731 0 0 1 .212.538.728.728 0 0 1-.75.75Zm-2 4H4a.728.728 0 0 1-.75-.75.728.728 0 0 1 .75-.75h12c.217 0 .396.07.538.212a.731.731 0 0 1 .212.538c0 .217-.07.396-.212.538a.731.731 0 0 1-.538.212Zm4-8H8A.726.726 0 0 1 7.25 8 .726.726 0 0 1 8 7.25h12a.728.728 0 0 1 .75.75.728.728 0 0 1-.75.75Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgLightList;
