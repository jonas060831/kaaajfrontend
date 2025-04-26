import { FC, ReactNode } from "react";
import styles from "./DismissModal.module.css";
import Button from "../Controls/buttons/Button";

type DismissModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

const DismissModal: FC<DismissModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {title && <h2 className={styles.title}>{title}</h2>}
        <br /><br />
        <div className={styles.content}>{children}</div>
        <br /><br />
        <Button className="danger" title="Dismiss" icon={''} onClick={onClose}/>
      </div>
    </div>
  );
};

export default DismissModal;
