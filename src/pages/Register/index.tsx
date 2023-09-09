import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import auth from '../../firebase';
import { useAuth } from '../../hooks/useAuth';
import UserService from '../../services/UserService';
import { Alert, AlertIcon, AlertDescription } from '@chakra-ui/react';

const Register = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const initialRank = 0;

  const registerUser = async () => {
    console.log('user');
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        UserService.createUser(name, initialRank, user.uid)
          .then(() => {
            login(user.uid, '/add-pokemon');
          })
          .catch((error) => {
            setErrorMessage(error.message);
          });
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    UserService.getUserByName(name).then((user) => {
      if (Object.keys(user).length === 0) {
        registerUser();
        setErrorMessage('');
      } else {
        setErrorMessage('User already exists');
      }
    });
  };

  return (
    <>
      {errorMessage && (
        <Alert status="error">
          <AlertIcon />
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
      <form onSubmit={onFormSubmit}>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
