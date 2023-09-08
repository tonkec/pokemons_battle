import { signOut } from 'firebase/auth';
import { useAuth } from '../../hooks/useAuth';
import auth from '../../firebase';
const Home = () => {
  const { logout } = useAuth();
  return (
    <>
      <h1>Home</h1>
      <button
        onClick={() => {
          signOut(auth)
            .then(() => {
              logout();
            })
            .catch((error) => {});
        }}
      >
        Sign out
      </button>
    </>
  );
};

export default Home;
