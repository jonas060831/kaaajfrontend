import { FC, ReactNode } from "react"

type CircleButtonProps = {
  icon: ReactNode;
  onClick: () => void;
  width?: number;
  height?: number;
  type: 'auto' | 'dark' | 'light'
}

import styles from './CircleButton.module.css'

const CircleButton:FC<CircleButtonProps> = ({ icon, onClick, width=50, height=50, type='auto' }) => {
 
  
  return (
    <button
     className={`${styles.circle_button} ${styles}.${type}`}
     onClick={onClick}
     style={{ width, height }}
    >
        {icon}
    </button>
  )
}

export default CircleButton