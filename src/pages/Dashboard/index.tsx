import { useAuth } from '../../hooks/useAuth';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <>
      <h1>Dashboard</h1>
      <h2>{user}</h2>
    </>
  );
};

export default Dashboard;
