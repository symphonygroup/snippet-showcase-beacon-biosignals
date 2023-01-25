import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/Header';
import { Type } from '../../components/Header/Header';
import If from '../../components/If';
import { RootState } from '../../store/store';

interface Props {
  children: React.ReactNode;
  header?: Type;
}

function Layout({ children, header }: Props) {
  const user = useSelector((state: RootState) => state.user);

  return (
    <>
      <If condition={!!user.email}>
        <Header type={header} />
      </If>
      <div>{children}</div>
    </>
  );
}

export default Layout;
