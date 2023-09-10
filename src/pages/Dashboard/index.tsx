import { useEffect, useState } from 'react';
import UserService from '../../services/UserService';
import TrainerCard from '../../components/TrainerCard';
import { useNavigate } from 'react-router';
import useTournament from '../../hooks/useTournament';
import { Heading } from '@chakra-ui/layout';
import { Input, Button } from '@chakra-ui/react';
import AuthorizedLayout from '../../layout/AuthorizedLayout';

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
    <AuthorizedLayout>
      <Heading as="h1" size="xl" textAlign="center" marginBottom={50}>
        List of all trainers
      </Heading>
      <Input
        marginBottom={10}
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

      <div style={{ marginTop: 50 }}>
        <Button
          onClick={() => {
            startTournament();
            navigate('/battle');
          }}
          colorScheme="blue"
        >
          Start Tournament
        </Button>

        <Button
          colorScheme="pink"
          onClick={() => {
            navigate('/add-pokemon');
          }}
          style={{ marginLeft: 10 }}
        >
          Add Pokemon
        </Button>
      </div>
    </AuthorizedLayout>
  );
};

export default Dashboard;
