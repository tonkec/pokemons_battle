import styled from '@emotion/styled';

export const AuthContainerStyled = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 0 15px;
  box-sizing: border-box;
  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;

export const GlobalContainerStyled = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px 15px;
  box-sizing: border-box;
  @media (max-width: 768px) {
    padding: 50px 10px;
  }

  @media (max-width: 480px) {
    max-width: 100%;
  }

  @media (max-width: 320px) {
    padding: 50px 5px;
  }
`;
