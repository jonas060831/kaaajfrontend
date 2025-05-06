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
import ManagerPage from './pages/protected/manager/ManagerPage';
import AccountPage from './pages/protected/account/AccountPage';

import { LoadScript } from '@react-google-maps/api';


const App = () => {
  const { user } = useAuthContext();

  return (
    <div className={styles.appWrapper}>
      <NavBar />
      <main className={styles.mainContent}>
       <LoadScript
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        libraries={['places']}
       >
        <Routes>

          {/* available for both auth and non auth users */}
          <Route path='/' element={user ? <DashboardPage /> : <LandingPage />} />

          {
            user ? (
              <>
                {/* protected routes */}
                <Route path='/manager' element={<ManagerPage />} />
                <Route path='/account' element={ <AccountPage/> }/>
              </>
            ) : (
              <>
                {/* unprotected */}
                <Route path='/signup' element={<SignUpPage />} />
                <Route path='/signin' element={<SignInPage />} />
                <Route path='/contact' element={<ContactPage />} />
              </>
            )
          }

          {/* fallback */}
          <Route path='*' element={<ErrorPage />} />

        </Routes>
        </LoadScript>
      </main>
      <Footer />
      <AarloChatButton />
    </div>
  );
};

export default App;
