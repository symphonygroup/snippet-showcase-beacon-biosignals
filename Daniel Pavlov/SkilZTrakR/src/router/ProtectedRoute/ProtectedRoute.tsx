import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import If from '../../components/If';

export default function ProtectedRoute({
  children,
  redirectPath,
  isAllowed,
}: any) {
  return (
    <>
      <If condition={isAllowed}>{children ? children : <Outlet />}</If>
      <If condition={!isAllowed}>
        <Navigate to={redirectPath} replace />
      </If>
    </>
  );
}
