import { useState, useEffect } from 'react';
import Icon from "../Icon/Icon";
import styles from './AarloChatButton.module.css';

const AarloChatButton = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showButton, setShowButton] = useState(false); // State to control visibility

  const handleClick = () => {
    alert('Opening chat box or support...');
    // You can replace this with logic to show a chat modal or redirect
  };

  const handleMouseEnter = () => {
    setShowOverlay(true);  // Show overlay when hovering
  };

  const handleMouseLeave = () => {
    setShowOverlay(false);  // Hide overlay when not hovering
  };

  // Check if the device is mobile on component mount
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);  // Adjust the width value as needed for your design
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Handle scroll event to show the button when user starts scrolling
  useEffect(() => {
    const handleScroll = () => {
      // Show button when scrolling down and hide when at the top
      if (window.scrollY > 100) { // Adjust 100 as the threshold for scrolling
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className={`${styles.dimOverlay} ${showOverlay ? styles.show : ''}`} />
      {showButton && (
        <div className={`${styles.chatButtonContainer} ${showButton ? styles.show : ''}`}>
          <button
            className={styles.chatButton}
            onClick={handleClick}
            onMouseEnter={!isMobile ? handleMouseEnter : undefined}  // Disable hover effect on mobile
            onMouseLeave={!isMobile ? handleMouseLeave : undefined}  // Disable hover effect on mobile
          >
            <div className={styles.chatButtonIcon}>
              <Icon category="Chat" width={40} height={40} />
            </div>
          </button>
          {showOverlay && (
            <div className={styles.tooltip}>Chat with Aarlo</div> // The tooltip that shows on hover
          )}
        </div>
      )}
    </>
  );
}

export default AarloChatButton;
