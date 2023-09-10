import { ReactNode } from 'react';
import { GlobalContainerStyled } from '../Containers';
import Nav from './Nav/Nav';

const AuthorizedLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Nav />

      <GlobalContainerStyled>{children}</GlobalContainerStyled>
    </>
  );
};

export default AuthorizedLayout;
