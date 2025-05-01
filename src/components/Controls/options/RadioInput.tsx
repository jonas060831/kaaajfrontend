import React, { FC, useEffect, useState } from 'react'

import styles from './RadioInput.module.css'

export interface Option {
    id: number;
    label: string;
    disabled?: boolean;
}
  

type RadioInputProps = {
    name: string;
    options: any
    setValue: (func: any) => void;
}

export const RadioInput:FC<RadioInputProps> = ({ name, options, setValue }) => {
  
  const [selectedId, setSelectedId] = useState<number>(options[0].id);


  useEffect(() => {
    setValue(options[0])
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newId = parseInt(e.target.value);
    setSelectedId(newId);
    setValue(options[newId]); // Use the updated value directly
  };


  return (
    <fieldset style={{ border: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }} >
      {options.map((opt:any) => (
        <label
         key={opt.id}
         className={styles.radio_label}
        >
          <input
            type="radio"
            className={styles.radio}
            name={name}            // ← same name for all
            value={opt.id}
            checked={selectedId === opt.id}
            onChange={handleChange}
            disabled={opt.disabled}
          />
          {opt.label}
        </label>
      ))}
    </fieldset>
  )
}
