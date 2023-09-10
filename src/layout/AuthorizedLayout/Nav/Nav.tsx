import { Link } from 'react-router-dom';
import { useAuth } from './../../../hooks/useAuth';
import { Button } from '@chakra-ui/react';
import { NavStyled } from './NavStyled';

const Nav = () => {
  const { user, logout } = useAuth();
  return (
    <NavStyled>
      <Link to="/">Home</Link>
      <Link to="/pokemons">Your pokemons</Link>
      {user && (
        <Button
          onClick={() => {
            logout();
          }}
          colorScheme="blue"
        >
          Log out
        </Button>
      )}
    </NavStyled>
  );
};

export default Nav;
