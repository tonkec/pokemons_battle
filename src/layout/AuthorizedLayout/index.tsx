import { ReactNode } from 'react';
import { GlobalContainerStyled } from '../Containers';

const AuthorizedLayout = ({ children }: { children: ReactNode }) => {
  return <GlobalContainerStyled>{children}</GlobalContainerStyled>;
};

export default AuthorizedLayout;
