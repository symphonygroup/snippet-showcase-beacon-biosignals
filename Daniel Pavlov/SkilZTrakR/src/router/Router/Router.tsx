import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../Layout';
import Initializator from '../../root-components/Initializator';
import ProtectedRoute from '../ProtectedRoute';
import { Type } from '../../components/Header/Header';
import Skills from '../../pages/Skills';
import Organization from '../../pages/Organization';
import Login from '../../pages/Login';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import If from '../../components/If';
import { UserRole } from '../../api/types';

function AppRouter() {
  const user = useSelector((state: RootState) => state.user);
  const isAllowed = !!user.email;
  const isAdmin = !!user.email && user.role === UserRole.Admin;

  return (
    <BrowserRouter>
      <Initializator>
        <Routes>
          <Route
            index
            element={
              <ProtectedRoute redirectPath="/login" isAllowed={isAllowed}>
                <Layout header={Type.sticky}>
                  <Skills />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="skills"
            element={
              <ProtectedRoute redirectPath="/login" isAllowed={isAllowed}>
                <Layout header={Type.sticky}>
                  <Skills />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="organization"
            element={
              <ProtectedRoute redirectPath="/skills" isAllowed={isAdmin}>
                <Layout header={Type.sticky}>
                  <Organization />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="login"
            element={
              <Layout header={Type.sticky}>
                <If condition={!isAllowed}>
                  <Login />
                </If>
                <If condition={isAllowed}>
                  <Navigate to="/skills" />
                </If>
              </Layout>
            }
          />
          <Route path="error" element={<div>Error page</div>} />
          <Route path="*" element={<div>404 Page not found</div>} />
        </Routes>
      </Initializator>
    </BrowserRouter>
  );
}

export { AppRouter as default };
