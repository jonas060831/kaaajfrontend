import { useState, useEffect } from 'react';
import Icon from "../Icon/Icon";
import styles from './AarloChatButton.module.css';

const AarloChatButton = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  return (
    <>
      <div className={`${styles.dimOverlay} ${showOverlay ? styles.show : ''}`} />
      <button
        className={styles.chatButton}
        onClick={handleClick}
        onMouseEnter={!isMobile ? handleMouseEnter : undefined}  // Disable hover effect on mobile
        onMouseLeave={!isMobile ? handleMouseLeave : undefined}  // Disable hover effect on mobile
      >
        <Icon category="Chat" width={30} height={30} />
      </button>
    </>
  );
}

export default AarloChatButton;
