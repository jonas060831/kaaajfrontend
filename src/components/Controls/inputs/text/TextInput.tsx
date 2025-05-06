import {
  ChangeEvent,
  useState,
  forwardRef,
  InputHTMLAttributes
} from "react";
import styles from "./TextInput.module.css";

type TextInputProps = {
  name: string;
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  id: string;
  required?: boolean;
  validPattern?: RegExp;
  inputMode?: InputHTMLAttributes<HTMLInputElement>["inputMode"];
  placeholder?: string;
};

// Use forwardRef to expose ref to parent components
const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      name,
      label,
      value,
      onChange,
      type = "text",
      id,
      required = false,
      validPattern,
      inputMode = "text",
      placeholder=""
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isValid, setIsValid] = useState(true);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => {
      setIsFocused(false);
      if (isValid || value.length === 0) setIsValid(true);
    };

    const shouldFloat = isFocused || value;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const valueToCheck = event.target.value;
      if (validPattern) setIsValid(validPattern.test(valueToCheck));
      onChange(event);
    };

    return (
      <div className={styles.floating_input_wrapper}>
        <label
          htmlFor={id}
          className={`${styles.floating_label} ${shouldFloat ? styles.float : ""}`}
        >
          {label}
        </label>
        <input
          ref={ref}
          name={name}
          id={id}
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={styles.floating_input}
          required={required}
          style={{ borderColor: isValid ? "unset" : "red" }}
          inputMode={inputMode}
        />
      </div>
    );
  }
);

export default TextInput;
