import { FC } from "react"

type ButtonProps = {
    title: string;
    icon: any;
    className?: 'light' | 'dark' | 'auto';
    width?: string;
    type?: "button" | "submit" | "reset";
}

import styles from './Button.module.css'

const Button:FC<ButtonProps> = ({ title, icon, className='auto', width='100%', type='button' }) => {
  return (
    <button
     className={`${styles.button} ${styles[className]}`}
     type={type}
     style={{ width: width }}
    >
        {title} {icon}
    </button>
  )
}

export default Button