import React from 'react';
import { Link } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import If from '../../If';

interface Props {
  path: string;
  name: string;
  dataQa: string;
  isAdmin: boolean;
}

function SecureHeaderLink({ path, name, dataQa, isAdmin }: Props) {
  return (
    <>
      <If condition={isAdmin}>
        <Link
          as={NavLink}
          to={path}
          p={2}
          size="16px"
          _activeLink={{ fontWeight: 'bold' }}
          m={3}
          data-qa={dataQa}
        >
          {name}
        </Link>
      </If>
    </>
  );
}

export default SecureHeaderLink;
