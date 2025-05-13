import { FC } from "react"

type ButtonProps = {
    className?: 'default' | 'dark' | 'light' | 'danger';
    title: string;
    icon: any;
    width?: string;
    type?: "button" | "submit" | "reset";
    isLoading?: boolean;
    isDisabled?: boolean;
    onClick?: () => void;
}

import styles from './Button.module.css'
import Icon from "../../Icon/Icon";

const Button:FC<ButtonProps> = ({ title, icon, width='100%', type='button', isLoading, className='default', onClick, isDisabled }) => {
  return (
    <button
     className={`${styles.button} ${styles[className]} ${isLoading ? styles.loading : ''}`}
     type={type}
     disabled={isLoading || isDisabled}
     onClick={onClick}
     style={{ width: width}}
    >
        {title} {isLoading ? <Icon category="Loading" width={35} height={35}/> : icon } 
    </button>
  )
}

export default Button