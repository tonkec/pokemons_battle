import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import Register from './pages/Register';
import Home from './pages/Home';
import { ProtectedRoute } from './routes/ProtectedRoute';
import Login from './pages/Login';
import Pokemons from './pages/Pokemons';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route path="/pokemons" element={<Pokemons />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
