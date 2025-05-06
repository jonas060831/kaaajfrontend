import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useAuthContext } from "../../../contexts/AuthContext"
import RequiredModal from "../../Modals/RequiredModal"
import TextInput from "../../Controls/inputs/text/TextInput"

import styles from './AccountsLocationForm.module.css'
import SelectInput from "../../Controls/selects/SelectInput"

import states from "../../../datas/states/states"
import Button from "../../Controls/buttons/Button"
import Icon from "../../Icon/Icon"

const AccountsLocationForm = () => {

  //check if the account location has been filled out if not display the form
  const { currentAccount } = useAuthContext()

  const [accountLocation, setAccountLocation] = useState<Record<string, any> | null>(null)
  const [formData, setFormData] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "CT",
    zipcode: "",
  })

  useEffect(() => {

    setAccountLocation(currentAccount?.location)
  }, [])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    console.log(formData)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    console.log(event.target.value)
    setFormData({...formData, [event.target.name]: event.target.value})
  }

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
              name="accountLocationAddressLine1"
              id="accountLocationAddressLine1"
              label="Address Line 1"
              value={formData.addressLine1}
              onChange={handleChange}
            />

            <TextInput
              name="accountLocationAddressLine2"
              id="accountLocationAddressLine2"
              label="Address Line 2 / Apt. #"
              value={formData.addressLine2}
              onChange={handleChange}
            />
          </div>

          <div className={styles.input_container_2_rows}>
            <TextInput
             name="accountLocationCity"
             id="accountLocationCity"
             label="City"
             value={formData.city}
             onChange={handleChange}
            />
            
            <SelectInput
             name="state"
             id="accountLocationState"
             label="State"
             value={formData.state}
             options={states}
             onChange={handleChange}
            />
          </div>

          <div className={styles.input_container_2_rows}>
            <TextInput
             type="tel"
             name="zipcode"
             id="zipcode"
             label="Zipcode"
             value={formData.zipcode}
             onChange={handleChange}
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