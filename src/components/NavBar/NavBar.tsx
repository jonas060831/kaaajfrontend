
import { NavLink } from 'react-router-dom'
import styles from './NavBar.module.css'

import { useState } from 'react';
import { motion } from 'framer-motion'

import { Typewriter } from 'react-simple-typewriter'
import Icon from '../Icon/Icon';
import { useAuthContext } from '../../contexts/AuthContext';

const NavBar = () => {

  const { user } = useAuthContext()

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false) /* mobile only */

  const toggleRightMenu = () :void => setIsMenuOpen(!isMenuOpen) /* mobile only */

  return (
    <>
      <nav className={styles.navbar_container}>
        {/* desktop */}
        <section className={styles.navbar}>
          <NavLink className={styles.company_logo} to="/">
            KaaaJ
          </NavLink>
          
          <section>
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