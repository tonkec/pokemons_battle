import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import auth from '../../firebase';
import { useAuth } from '../../hooks/useAuth';
import { Input, Button, Heading } from '@chakra-ui/react';
import AuthLayout from '../../layout/AuthLayout';
import { AuthLinkStyled } from '../../layout/AuthLayout/AuthLayoutStyled';
import { Link } from 'react-router-dom';
import { toastType } from '../../components/Toast';
import Toast from '../../components/Toast';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastType, setToastType] = useState<toastType>(undefined);

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user: any = userCredential.user;
        setTimeout(() => {
          login(user.uid, '/');
        }, 1000);

        setToastMessage('Logged in successfully');
        setToastType('success');
      })
      .catch((error) => {
        const errorMessage = error.message;
        setToastMessage(errorMessage);
        setToastType('error');
      });
  };
  return (
    <AuthLayout>
      <Heading as="h1" size="lg" marginBottom={'2rem'} color={'white'}>
        Welcome back!
      </Heading>
      <form onSubmit={onFormSubmit}>
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
          Login
        </Button>

        <Link to="/register">
          {' '}
          <AuthLinkStyled>Register</AuthLinkStyled>
        </Link>

        <div style={{ marginTop: 30 }}>
          {toastMessage && <Toast message={toastMessage} type={toastType} />}
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
