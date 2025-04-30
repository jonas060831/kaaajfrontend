import { FC, ReactNode } from "react";
import Icon from "../Icon/Icon";

import styles from './InlineError.module.css'
type InlineErrorProps = {
  header?: string;
  icon?: any;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void
}
const InlineError:FC<InlineErrorProps> = ({header='Error', icon=<Icon category="" width={24} height={24}/>, children, isOpen, onClose }) => {

  if (!isOpen) return null;

  return (
    <div className={styles.container}>

        
        <div className={styles.header}>
          {icon} {header}
          <button>
            <Icon category="Times" width={24} height={24} onClick={onClose}/>
          </button>
        </div>
        
        {children}
    </div>
  )
}

export default InlineError