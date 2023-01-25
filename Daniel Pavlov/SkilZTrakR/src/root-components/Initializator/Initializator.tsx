import React, { ReactNode } from 'react';
import Secure from './Secure';

interface Props {
  children?: ReactNode;
}

const Initializator = ({ children }: Props) => {
  return <Secure>{children}</Secure>;
};

export default Initializator;
