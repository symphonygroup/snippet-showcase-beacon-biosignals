import React from 'react';
import { Link } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

interface Props {
  path: string;
  name: string;
  dataQa: string;
}

function SecureHeaderLink({ path, name, dataQa }: Props) {
  return (
    <>
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
    </>
  );
}

export default SecureHeaderLink;
