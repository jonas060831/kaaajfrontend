import { FC } from "react"

type ButtonProps = {
    title: string;
    icon: any;
    className?: 'light' | 'dark' | 'auto';
    width?: string ;
}

import styles from './Button.module.css'

const Button:FC<ButtonProps> = ({ title, icon, className='auto', width='100%' }) => {
  return (
    <button className={`${styles.button} ${styles[className]}`} style={{ width: width}}>
        {title} {icon}
    </button>
  )
}

export default Button