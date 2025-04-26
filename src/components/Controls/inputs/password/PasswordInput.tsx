import { ChangeEvent, FC, useState } from "react";
import styles from "./PasswordInput.module.css";
import Icon from "../../../Icon/Icon";

type PasswordInputProps = {
  name: string;
  label: string;
  value: string;
  onChange: (event: any) => any;
  type?: string;
  id: string;
  required?: boolean;
  validPattern?: RegExp;
};

const PasswordInput: FC<PasswordInputProps> = ({
  name,
  label,
  value,
  onChange,
  id,
  required = false,
  validPattern,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setIsFocused(false);
    if (isValid || value.length === 0) setIsValid(true);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const valueToCheck = event.target.value;
    if (validPattern) setIsValid(validPattern.test(valueToCheck));
    onChange(event);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const shouldFloat = isFocused || value;

  return (
    <div className={styles.floating_input_wrapper}>
      <label
        htmlFor={id}
        className={`${styles.floating_label} ${shouldFloat ? styles.float : ""}`}
      >
        {label}
      </label>
      <div className={styles.input_with_icon}>
        <input
          name={name}
          id={id}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={styles.floating_input}
          required={required}
          style={{ borderColor: isValid ? "unset" : "red" }}
        />
        {value && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className={styles.eye_button}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <Icon category="EyeClose" width={30} height={30} color="var(--font-color)"/> : <Icon category="EyeOpen" width={30} height={30} color="var(--font-color)"/>}
          </button>
        )}
      </div>
    </div>
  );
};

export default PasswordInput;
