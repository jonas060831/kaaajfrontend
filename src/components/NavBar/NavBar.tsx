
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import styles from './NavBar.module.css'

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion'

import { Typewriter } from 'react-simple-typewriter'
import Icon from '../Icon/Icon';
import { useAuthContext } from '../../contexts/AuthContext';
import CircleButton from '../Controls/buttons/CircleButton';

const NavBar = () => {

  const { user } = useAuthContext()
  const navigate = useNavigate()
  const location = useLocation()

  const [isHidden, setIsHidden] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false) /* mobile only */

  const toggleRightMenu = () :void => setIsMenuOpen(!isMenuOpen) /* mobile only */


  const { pathname } = location

  useEffect(() => {
    pathname === '/signin' || pathname === '/signup' ? setIsHidden(true) : setIsHidden(false)
  }, [pathname])

  return (
    <>
      <nav className={styles.navbar_container}>
        {/* desktop */}
        <section className={styles.navbar}>

          {/* show this instead when on signin page */}
          {
            isHidden ? (
              <>
                <CircleButton
                type='auto'
                icon={<Icon  category='LeftArrow' width={24} height={24}/>}
                onClick={() => navigate(-1)}
                width={40}
                height={40}
                />
                <ul className={styles.links}>

                    {
                      pathname !== '/signup' ? (
                        <li >
                          <NavLink to="/signup" className={styles.navbar_links}>
                            <Icon category='SignUp' width={20} height={20}/>
                            Sign Up
                          </NavLink>
                        </li>
                      ) : (
                        <li style={{ visibility: 'hidden' }}>
                          <NavLink to="/" className={styles.navbar_links}>
                            <Icon category='SignUp' width={20} height={20}/>
                            Sign Up
                          </NavLink>
                        </li>
                      )
                    }
                    
                </ul>
                
              </>
            ) : (
            <NavLink className={styles.company_logo} to="/">
              KaaaJ
            </NavLink>
            )
          }

          
          
          <section style={{ display: isHidden ? 'none' : 'unset' }}>
          <ul className={styles.links}>
              <li>
                <NavLink to="/services" className={styles.navbar_links}>
                  <Icon category='Services' width={20} height={20}/>
                  Services
                </NavLink>
              </li>
              
              <li>
                <NavLink to="/careers" className={styles.navbar_links}>
                  <Icon category='Careers' width={20} height={20}/>
                  Careers
                </NavLink>
              </li>

              <li>
                <NavLink to="/about" className={styles.navbar_links}>
                  <Icon category='About' width={20} height={20}/>
                  About
                </NavLink>
              </li>

              <li>
                <NavLink to="/contact" className={styles.navbar_links}>
                  <Icon category='Contact' width={20} height={20}/>
                  Contact
                </NavLink>
              </li>
              
              <li>
                <NavLink to={ user ? '/account' : '/signin' } className={styles.navbar_links}>

                  {user ? 
                    <>
                      <Icon category='Account' width={24} height={24}/>
                      Account
                    </>
                    :
                    <>
                      <Icon category='SignIn' width={24} height={24}/>
                      Sign In
                    </>
                  }
                  
                </NavLink>
              </li>
          </ul>
          </section>

          {/* right menu icon */}
          <section className={styles.menu_container}>
            <Icon
             category='Menu'
             className={styles.mobile_menu}
             width={24}
             height={24}
             onClick={toggleRightMenu}
            />
          </section>
        </section>
      </nav>

      {/* overlay */}
      {
        isMenuOpen && (
          <div className={styles.overlay} onClick={toggleRightMenu}></div>
        )
      }

      {/* right menu mobile */}
      <motion.div
         className={styles.right_menu}
         initial={{ x: "100%" }}
         animate={{ x: isMenuOpen ? "0%" : "100%" }}
         transition={{ type: "linear", stiffness: 100, damping: 15 }}
        >

        <ul className={styles.menu_header}>
          <li>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Typewriter
             words={['🏢 Corporate', '🏜️ Real State', '🏥 Healthcare', '🛍️ Retail', '🎬 Movie', '🍟 Restaurant']}
             loop={false} /* infinite loop */
             cursor
             cursorStyle='_'
             typeSpeed={70}
             deleteSpeed={50}
             delaySpeed={1000}
            />
          </li>
          <li>
            <Icon
              category='RightArrow'
              className={styles.mobile_right_arrow}
              width={35}
              height={35}
              onClick={toggleRightMenu}
            />
          </li>
        </ul>

        <ul className={styles.menu_links}>
          
          <NavLink to={user ? '/account' : '/signin'} onClick={() => toggleRightMenu()}>
            <li>
              {user ? 
                  <>
                    <Icon category='Account' width={24} height={24}/>
                    Account
                  </>
                  :
                  <>
                    <Icon category='SignIn' width={24} height={24}/>
                    Sign In
                  </>
                }
            </li>
            
          </NavLink>
          
          <NavLink to="/services" onClick={() => toggleRightMenu()}>
            <li>
              <Icon category='Services' width={24} height={24}/> Services
            </li>
          </NavLink>
          
          <NavLink to="/careers" onClick={() => toggleRightMenu()} >
            <li>
              <Icon category='Careers'width={24} height={24}/>
              Careers
            </li>
          </NavLink>

          <NavLink to="/about" onClick={() => toggleRightMenu()}>
            <li>
              <Icon category='About' width={24} height={24}/> About
            </li>
          </NavLink>
          
          <NavLink to="/contact" onClick={() => toggleRightMenu()}>
            <li>
              <Icon category='Contact' width={24} height={24}/> Contact
            </li>
          </NavLink>
          
        </ul>

        </motion.div>
      
        
    </>
  )
}

export default NavBar