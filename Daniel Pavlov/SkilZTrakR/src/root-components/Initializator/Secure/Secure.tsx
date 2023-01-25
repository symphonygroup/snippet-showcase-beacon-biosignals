import React, { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

function Secure({ children }: Props) {
  return <>{children}</>;
}

export default Secure;
