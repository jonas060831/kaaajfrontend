
/*

options format 

const category = {
   "keyName" : [
    {
      id: numbers,
      value: string,
      full: string
    }
   
   ]

}

*/



import { FC, useState, ChangeEvent } from "react"
import { statesType } from "../../../datas/states/states";
import styles from './SelectInput.module.css'

type SelectInputProps = {
    id: string;
    label: string;
    name: string;
    value: string;
    options: statesType | any; //NOTE follow the stateType Pattern
    required?: boolean;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}
const SelectInput:FC<SelectInputProps> = ({ id, label, name, value, options, required=true, onChange }) => {

  const [isFocused, setIsFocused] = useState(true);
  const [isValid, setIsValid] = useState(true)

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setIsFocused(false)
    
    if(isValid || value.length === 0) setIsValid(true)
  };
  const shouldFloat = isFocused || value;

  //check the value on each value change
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event)
    
  }


  return (
    <div className={styles.floating_input_wrapper}>

        <label htmlFor={id}
         className={`${styles.floating_label} ${shouldFloat ? styles.float : ""}`}
        >
          {label}
        </label>
        <select
         className={styles.floating_input}
         name={name} id={id}
         required={required}
         value={value}
         onChange={handleChange}
         onFocus={handleFocus}
         onBlur={handleBlur}
        > 
          {Object.entries(options).map(([keyName, list]:any) => (
            <optgroup key={keyName} label={keyName.toUpperCase()}>
              {list.map((element:any) => (
                <option key={element.id} value={element.value}>
                  {element.full}
                </option>
              ))}
            </optgroup>
          ))}
            
        </select>
    </div>
  )
}

export default SelectInput