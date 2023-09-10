import styled from '@emotion/styled';

export const NavStyled = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: #fff;
  height: 100%;
  width: 100%;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 1;
  transition: all 0.3s ease-in-out;

  a {
    display: inline-block;
    margin: 0 1rem;
  }
`;
