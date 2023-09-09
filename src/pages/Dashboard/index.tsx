import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import UserService from '../../services/UserService';

const Dashboard = () => {
  const { user } = useAuth();

  useEffect(() => {
    const getAllUsersFromDatabase = async () => {
      const users = await UserService.getAllUsers();
      console.log(users);
    };

    getAllUsersFromDatabase();
  }, [user]);

  return (
    <>
      <h1>Dashboard</h1>
      <h2>{user}</h2>
    </>
  );
};

export default Dashboard;
