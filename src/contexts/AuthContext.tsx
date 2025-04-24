import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

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

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  // ⏰ Token expiry check
  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);

        if (payload && payload.exp < currentTime) {
          clearUser();
          setIsSessionExpired(true);
        }
      } catch (error) {
        console.error('Token parse error:', error);
      }
    }, 500); // check every 5 seconds

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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
            <h2 className="text-xl font-semibold mb-2">Session Expired</h2>
            <p className="mb-4">Your session has ended. Please Sign In again.</p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => {
                setIsSessionExpired(false);
                window.location.href = '/signin';
              }}
            >
              Go To Sign In
            </button>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => useContext(AuthContext);

export { AuthProvider, useAuthContext };
