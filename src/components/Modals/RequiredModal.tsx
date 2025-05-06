import { FC, ReactNode } from "react";
import styles from "./Modal.module.css";

type RequiredModalProps = {
  isOpen: boolean;
//   onClose: () => void;
  title?: string;
  children: ReactNode;
};


const RequiredModal:FC<RequiredModalProps> = ({ isOpen, title, children }) => {
  
  if (!isOpen) return null

  return (
    <div className={styles.overlay}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            {title && <h2 className={styles.title}>{title}</h2>}
            <br /><br />
            <div className={styles.content}>{children}</div>
            <br /><br />
        </div>
    </div>
  )
}

export default RequiredModal