import { FC } from "react"

type ButtonProps = {
    title: string;
    icon: any;
    className?: 'light' | 'dark' | 'auto' 
}

import styles from './Button.module.css'

const Button:FC<ButtonProps> = ({ title, icon, className='auto' }) => {
  return (
    <button className={`${styles.button} ${styles[className]}`}>
        {title} {icon}
    </button>
  )
}

export default Button