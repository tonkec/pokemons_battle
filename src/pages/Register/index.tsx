import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import auth from '../../firebase';
import { useAuth } from '../../hooks/useAuth';
import UserService from '../../services/UserService';
import { Input, Button, Heading } from '@chakra-ui/react';
import AuthLayout from '../../layout/AuthLayout';
import { Link } from 'react-router-dom';
import { AuthLinkStyled } from '../../layout/AuthLayout/AuthLayoutStyled';
import Toast, { toastType } from '../../components/Toast';

const Register = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastType, setToastType] = useState<toastType>(undefined);

  const initialRank = 0;

  const registerUser = async () => {
    if (!name) {
      setToastMessage('Name is required');
      setToastType('error');
      return;
    }

    if (!email) {
      setToastMessage('Email is required');
      setToastType('error');
      return;
    }

    if (!password) {
      setToastMessage('Password is required');
      setToastType('error');
      return;
    }

    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        UserService.createUser(name, initialRank, user.uid)
          .then(() => {
            setToastMessage('Logged in successfully');
            setToastType('success');
            setTimeout(() => {
              login(user.uid, '/add-pokemon');
            }, 1000);
          })
          .catch((error) => {
            setToastMessage(error.message);
          });
      })
      .catch((error) => {
        setToastMessage(error.message);
        setToastType('error');
      });
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    UserService.getUserByName(name).then((user) => {
      if (Object.keys(user).length === 0) {
        registerUser();
      } else {
        setToastMessage('User already exists');
        setToastType('error');
      }
    });
  };

  return (
    <AuthLayout>
      <Heading as="h1" size="lg" marginBottom={'2rem'} color={'white'}>
        Become a Pokemon Master!
      </Heading>
      <form onSubmit={onFormSubmit}>
        <Input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          backgroundColor={'white'}
          marginBottom={'0.4rem'}
        />
        <Input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          backgroundColor={'white'}
          marginBottom={'0.4rem'}
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          backgroundColor={'white'}
          marginBottom={'1rem'}
        />
        <Button colorScheme="pink" type="submit">
          Register
        </Button>

        <Link to="/login">
          {' '}
          <AuthLinkStyled>Login</AuthLinkStyled>
        </Link>

        <div style={{ marginTop: 30 }}>
          {toastMessage && <Toast message={toastMessage} type={toastType} />}
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register;
