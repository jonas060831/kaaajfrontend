import { FC, ReactNode } from "react"

type CircleButtonProps = {
  icon: ReactNode;
  onClick?: () => void;
  width?: number;
  height?: number;
  className?: 'auto' | 'dark' | 'light';
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
}

import styles from './CircleButton.module.css'
import Icon from "../../Icon/Icon";

const CircleButton:FC<CircleButtonProps> = ({ icon, onClick, width=50, height=50, type='button', className='auto', isLoading }) => {
 
  
  return (
    <button
     type={type}
     disabled={isLoading}
     className={`${styles.circle_button} ${styles[className]} ${isLoading ? styles.loading : ''}`}
     onClick={onClick}
     style={{ width, height }}
    >
         { isLoading ? <Icon category="Loading" width={24} height={24}/> : icon }
    </button>
  )
}

export default CircleButton