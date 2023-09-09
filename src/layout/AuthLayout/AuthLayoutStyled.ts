import styled from '@emotion/styled';

export const AuthLayoutStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-image: linear-gradient(
    to right top,
    #4174d9,
    #0081d1,
    #0087b9,
    #00899a,
    #00887d
  );
  height: 100vh;
`;

export const AuthLinkStyled = styled.span`
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  margin-top: 20px;
  cursor: pointer;
  margin-left: 10px;
  &:hover {
    text-decoration: underline;
  }
`;
