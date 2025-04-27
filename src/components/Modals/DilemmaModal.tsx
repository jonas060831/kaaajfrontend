import { FC, ReactNode } from "react";
import styles from "./Modal.module.css";
import Button from "../Controls/buttons/Button";

type DilemmaModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  buttonClassName?: "default" | "dark" | "light" | "danger" | undefined;
  buttonTitle?: string;
  cancelButtonText: string;
  onAction: () => void;
};

const DilemmaModal: FC<DilemmaModalProps> = ({ isOpen, onClose, title, children, buttonClassName, buttonTitle, cancelButtonText, onAction }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {title && <h2 className={styles.title}>{title}</h2>}
        <br /><br />
        <div className={styles.content}>{children}</div>
        <br /><br />
        
        <div style={{ display: 'flex', gap: '1rem' }}>

            <Button className={buttonClassName ? buttonClassName : "default" } title={buttonTitle!} icon={''} onClick={onAction}/>
            <Button className='light' title={cancelButtonText} icon={''} onClick={onClose} />

        </div>

      </div>
    </div>
  );
};

export default DilemmaModal;
