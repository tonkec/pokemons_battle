import { useEffect, useState } from 'react';
import UserService from '../../services/UserService';
import TrainerCard from '../../components/TrainerCard';
import { useNavigate } from 'react-router';
import useTournament from '../../hooks/useTournament';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [users, setUsers] = useState<any>([]);
  const navigate = useNavigate();
  const { startTournament } = useTournament();

  const fetchUsers = async () => {
    UserService.getAllUsers()
      .then((users) => {
        setUsers(users);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <>
      <h1>List of all trainers</h1>
      <input
        type="search"
        placeholder="Search for a trainer"
        onChange={(e) => {
          const filteredTrainers = users.filter((trainer: any) => {
            return trainer.name
              .toLowerCase()
              .includes(e.target.value.toLowerCase());
          });

          if (e.target.value === '') {
            fetchUsers();
          }
          setUsers(filteredTrainers);
        }}
      />
      {users && users.length > 0 && (
        <div>
          {users.map((user: any) => (
            <div key={user.userId}>
              <TrainerCard
                trainer={user}
                onClick={() => {
                  navigate(`/trainer/${user.userId}`);
                }}
              />
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => {
          startTournament();
          navigate('/battle');
        }}
      >
        Start Tournament
      </button>

      <Link to="/add-pokemon">Add Pokemon</Link>
    </>
  );
};

export default Dashboard;
