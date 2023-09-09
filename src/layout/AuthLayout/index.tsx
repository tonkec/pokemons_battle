import React from 'react';
import { AuthLayoutStyled } from './AuthLayoutStyled';
import { Global, css } from '@emotion/react';
import { ContainerStyled } from '../Containers';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Global
        styles={css`
          body,
          html,
          #root {
            height: 100vh;
          }
        `}
      />

      <AuthLayoutStyled>
        <ContainerStyled>{children}</ContainerStyled>
      </AuthLayoutStyled>
    </>
  );
};

export default AuthLayout;
