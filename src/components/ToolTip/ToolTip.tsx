import React from 'react';
import styles from './Tooltip.module.css';


type TooltipProps = {
  text: string;
  children: React.ReactNode;
};

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  return (
    <div className={styles.tooltip_wrapper}>
      {children}
      <span className={styles.tooltip_text}>{text}</span>
    </div>
  );
};

export default Tooltip;
