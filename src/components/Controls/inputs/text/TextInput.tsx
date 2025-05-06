import { ChangeEvent, FC, useState } from "react";
import styles from "./TextInput.module.css";

type TextInputProps = {
  name: string;
  label: string;
  value: string;
  onChange: (event: any) => any
  type?: string;
  id: string;
  required?: boolean;
  validPattern?: RegExp;
  inputMode?: "text" | "search" | "email" | "tel" | "url" | "none" | "numeric" | "decimal" | undefined
}

const TextInput:FC<TextInputProps> = ({ name, label, value, onChange, type = "text", id, required=false, validPattern, inputMode="text" }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(true)

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setIsFocused(false)
    
    if(isValid || value.length === 0) setIsValid(true)
  };
  const shouldFloat = isFocused || value;

  //check the value on each value change
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const valueToCheck = event.target.value

    if(validPattern) setIsValid(validPattern.test(valueToCheck))
    onChange(event)

  }

  return (
    <div className={styles.floating_input_wrapper}>
      <label
        htmlFor={id}
        className={`${styles.floating_label} ${shouldFloat ? styles.float : ""}`}
      >
        {label}
      </label>
      <input
        name={name}
        id={id}
        type={type}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={styles.floating_input}
        required={required}
        style={{ borderColor: isValid ? 'unset' : 'red' }}
        inputMode={inputMode}
      />
    </div>
  );
};

export default TextInput;
