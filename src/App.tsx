import { Routes, Route } from 'react-router';
import NavBar from './components/NavBar/NavBar';
import { useAuthContext } from './contexts/AuthContext';
import DashboardPage from './pages/protected/DashboardPage';
import LandingPage from './pages/unprotected/LandingPage';
import Footer from './components/Footer/Footer';
import SignUpPage from './pages/unprotected/SignUpPage';
import ErrorPage from './pages/unprotected/ErrorPage';
import SignInPage from './pages/unprotected/SignInPage';
import ContactPage from './pages/unprotected/ContactPage';

const App = () => {

  const { user } = useAuthContext()

  return (
    <>
      <NavBar />
      <Routes>
        {/* unprotected */}
        <Route path='/' element={ user ? <DashboardPage/> : <LandingPage /> }/>
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/signin' element={<SignInPage />} />
        <Route path='/contact' element={<ContactPage />} />

        {/* protected */}

        {/* 404 page */}
        <Route path='*' element={<ErrorPage />} />

      </Routes>
      <Footer />
    </>
  )
}

export default App
