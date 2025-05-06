import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useAuthContext } from "../../../contexts/AuthContext"
import RequiredModal from "../../Modals/RequiredModal"
import TextInput from "../../Controls/inputs/text/TextInput"

import styles from './AccountsLocationForm.module.css'
import SelectInput from "../../Controls/selects/SelectInput"

import states from "../../../datas/states/states"
import Button from "../../Controls/buttons/Button"
import Icon from "../../Icon/Icon"
import { updateAccountById } from "../../../services/accountService"

const AccountsLocationForm = () => {

  //check if the account location has been filled out if not display the form
  const { currentAccount } = useAuthContext()

  const [accountLocation, setAccountLocation] = useState<Record<string, any> | null>(null)
  const [formData, setFormData] = useState({
    location: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "CT",
      zipcode: "",
    }
  })

  useEffect(() => {

    setAccountLocation(currentAccount?.location)
  }, [])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    try {
      const res = await updateAccountById(currentAccount!._id,formData)

      console.log(res)
    } catch (error) {
      
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
  
    if (name in formData.location) {
      setFormData(prev => ({
        ...prev,
        location: {
          ...prev.location,
          [name]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  

  if(currentAccount?.location) return null

  return (
    <div>

      <RequiredModal
       isOpen={!accountLocation?.location}
       title="Address is Required"
      >
        <form onSubmit={handleSubmit}>

          <div className={styles.input_container_2_rows}>
            <TextInput
              name="addressLine1"
              id="accountLocationAddressLine1"
              label="Address Line 1"
              value={formData.location.addressLine1}
              onChange={handleChange}
              required
            />

            <TextInput
              name="addressLine2"
              id="accountLocationAddressLine2"
              label="Address Line 2 / Apt. #"
              value={formData.location.addressLine2}
              onChange={handleChange}
            />
          </div>

          <div className={styles.input_container_2_rows}>
            <TextInput
             name="city"
             id="accountLocationCity"
             label="City"
             value={formData.location.city}
             onChange={handleChange}
             required
            />
            
            <SelectInput
             name="state"
             id="accountLocationState"
             label="State"
             value={formData.location.state}
             options={states}
             onChange={handleChange}
            />
          </div>

          <div className={styles.input_container_2_rows}>
            <TextInput
             name="zipcode"
             id="zipcode"
             label="Zipcode"
             value={formData.location.zipcode}
             onChange={handleChange}
             validPattern={/^\d{5}(-\d{4})?$/}
             inputMode="numeric"
             required
            />
          </div>

          <Button
           type="submit"
           title="Save"
           icon={<Icon category="Check" width={24} height={24}/>}
          />
        </form>
      </RequiredModal>

    </div>
  )
}

export default AccountsLocationForm