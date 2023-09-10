import React from 'react';
import { AuthLayoutStyled } from './AuthLayoutStyled';
import { Global, css } from '@emotion/react';
import { AuthContainerStyled } from '../Containers';

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
        <AuthContainerStyled>{children}</AuthContainerStyled>
      </AuthLayoutStyled>
    </>
  );
};

export default AuthLayout;
