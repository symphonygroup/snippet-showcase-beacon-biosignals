import React, { MutableRefObject } from 'react';

interface Props {
  condition: boolean;
  children: React.ReactNode;
  ref?: MutableRefObject<unknown>;
}

export default function If({ condition, children }: Props) {
  if (condition) {
    return <>{children}</>;
  }
  return null;
}
