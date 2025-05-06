import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import DismissModal from '../components/Modals/DismissModal';
import { useLocation, useNavigate } from 'react-router';

// --- Interfaces ---
export interface User {
  username: string;
  _id: string;
  role: string;
  iat: number;
  exp: number;
}

interface Account {
  _id: string;
  name: string;
  [key: string]: any;
}

interface AuthContextValues {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  currentAccount: Account | null;
  setCurrentAccount: (account: Account | null) => void;
}

// --- Context Initialization ---
const AuthContext = createContext<AuthContextValues>({
  user: null,
  setUser: () => {},
  clearUser: () => {},
  currentAccount: null,
  setCurrentAccount: () => {},
});

// --- Utility: Extract user data from JWT ---
const getUserFromToken = (): User | null => {
  if (typeof window === 'undefined') return null;

  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload as User;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

// --- Utility: Load currentAccount from localStorage ---
const getStoredAccount = (): Account | null => {
  const stored = localStorage.getItem('currentAccount');
  if (!stored) return null;

  try {
    return JSON.parse(stored);
  } catch (err) {
    console.error('Failed to parse stored account:', err);
    return null;
  }
};

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

  const { pathname } = useLocation()


  const [user, setUser] = useState<User | null>(getUserFromToken());
  const [currentAccount, _setCurrentAccount] = useState<Account | null>(getStoredAccount());

  const [isSessionExpired, setIsSessionExpired] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const clearUser = () => {
    setUser(null);
    _setCurrentAccount(null);
    localStorage.removeItem('token');
    localStorage.removeItem('currentAccount');
  };

  const setCurrentAccount = (account: Account | null) => {
    _setCurrentAccount(account);
    if (account) {
      localStorage.setItem('currentAccount', JSON.stringify(account));
    } else {
      localStorage.removeItem('currentAccount');
    }
  };

  // Session expiration check
  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);

        if (payload && payload.exp < currentTime) {
          setIsSessionExpired(true);
          setIsModalOpen(true);
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
    currentAccount,
    setCurrentAccount,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}

      {isSessionExpired && (
        <DismissModal
          title='Good Bye!'
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            clearUser();
            navigate(`/signin?redirectUrl=${pathname}`);
          }}
          buttonTitle='Ok'
        >
          <h3>Session Expired</h3>
        </DismissModal>
      )}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => useContext(AuthContext);

export { AuthProvider, useAuthContext };
