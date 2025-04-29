import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import DismissModal from '../components/Modals/DismissModal';
import { useNavigate } from 'react-router';



interface User {
  username: string;
  _id: string;
  role: string;
  iat: number;
  exp: number;
}

interface AuthContextValues {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

const AuthContext = createContext<AuthContextValues>({
  user: null,
  setUser: () => {},
  clearUser: () => {},
});

// Utility: extract user data from JWT
const getUserFromToken = (): User | null => {
  if (typeof window === 'undefined') return null

  const token = localStorage.getItem('token')
  if (!token) return null

  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload as User
  } catch (error) {
    console.error('Error decoding token:', error)
    return null;
  }
};

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(getUserFromToken());
  const [isSessionExpired, setIsSessionExpired] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false)


  const navigate = useNavigate()

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem('token');
      if (!token) return;


  
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);
  
        //token is expired which being check every 500ms
        if (payload && payload.exp < currentTime) {
          setIsSessionExpired(true)
          setIsModalOpen(true)
        }
      } catch (error) {
        console.error('Token parse error:', error);
      }
    }, 500);
  
    return () => clearInterval(interval);
  }, []);

  const contextValue: AuthContextValues = {
    user,
    setUser,
    clearUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}

      {isSessionExpired && (
        <DismissModal
          title='Good Bye!'
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            clearUser()
            navigate('/signin')
            
          }}
          buttonTitle='Ok'
        >
          <h3>
            Session Expired
          </h3>
        </DismissModal>
      )}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => useContext(AuthContext);

export { AuthProvider, useAuthContext };
