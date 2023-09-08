import { ReactNode, createContext, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from './../hooks/useLocalStorage';
export const AuthContext = createContext({
  user: null,
  login: (data: any, url: string) => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useLocalStorage('user', null);
  const navigate = useNavigate();

  const login = useCallback(
    (data: string, url: string) => {
      setUser(data);
      navigate(url);
    },
    [navigate, setUser]
  );

  const logout = useCallback(() => {
    setUser(null);
    navigate('/login', { replace: true });
  }, [setUser, navigate]);

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user, login, logout]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
