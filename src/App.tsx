import { Routes, Route } from 'react-router-dom'; // use react-router-dom
import NavBar from './components/NavBar/NavBar';
import { useAuthContext } from './contexts/AuthContext';
import DashboardPage from './pages/protected/DashboardPage';
import LandingPage from './pages/unprotected/LandingPage';
import Footer from './components/Footer/Footer';
import SignUpPage from './pages/unprotected/SignUpPage';
import ErrorPage from './pages/unprotected/ErrorPage';
import SignInPage from './pages/unprotected/SignInPage';
import ContactPage from './pages/unprotected/ContactPage';

import styles from './App.module.css';
import AarloChatButton from './components/AarloButton/AarloChatButton';

const App = () => {
  const { user } = useAuthContext();

  return (
    <div className={styles.appWrapper}>
      <NavBar />
      <main className={styles.mainContent}>
        <Routes>
          {/* unprotected */}
          <Route path='/' element={user ? <DashboardPage /> : <LandingPage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/signin' element={<SignInPage />} />
          <Route path='/contact' element={<ContactPage />} />

          {/* protected routes could go here */}

          {/* fallback */}
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </main>
      <Footer />
      <AarloChatButton />
    </div>
  );
};

export default App;
