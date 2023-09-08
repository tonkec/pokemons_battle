import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import Register from './pages/Register';
import { ProtectedRoute } from './routes/ProtectedRoute';
import Login from './pages/Login';
import AddPokemon from './pages/AddPokemon';
import UserPokemons from './pages/UserPokemons';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-pokemon"
            element={
              <ProtectedRoute>
                <AddPokemon />
              </ProtectedRoute>
            }
          />

          <Route
            path="/pokemons"
            element={
              <ProtectedRoute>
                <UserPokemons />
              </ProtectedRoute>
            }
          />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
