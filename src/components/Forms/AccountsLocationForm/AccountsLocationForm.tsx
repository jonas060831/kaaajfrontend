import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState
} from "react";
import { useAuthContext } from "../../../contexts/AuthContext";
import RequiredModal from "../../Modals/RequiredModal";
import TextInput from "../../Controls/inputs/text/TextInput";
import SelectInput from "../../Controls/selects/SelectInput";
import Button from "../../Controls/buttons/Button";
import Icon from "../../Icon/Icon";

import styles from "./AccountsLocationForm.module.css";
import states, { findStateByFullName } from "../../../datas/states/states";
import { updateAccountById } from "../../../services/accountService";

interface LocationData {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipcode: string;
  latitude?: number;
  longitude?: number;
}

interface FormData {
  location: LocationData;
}

declare global {
  interface Window {
    google: typeof google;
  }

  namespace google.maps {
    interface GeocoderAddressComponent {
      long_name: string;
      short_name: string;
      types: string[];
    }
  }
}

const AccountsLocationForm = () => {
  const { currentAccount } = useAuthContext();
  const addressInputRef = useRef<HTMLInputElement>(null);
  const [accountLocation, setAccountLocation] = useState<LocationData | null>(null);
  const [formData, setFormData] = useState<FormData>({
    location: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "CT",
      zipcode: "",
    },
  });

  const [autocompleteResults, setAutocompleteResults] = useState<any[]>([]);
  const [_, setSelectedResult] = useState<string | null>(null);
  const [addressQuery, setAddressQuery] = useState("");
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setAccountLocation(currentAccount?.location ?? null);
  }, [currentAccount]);

  useEffect(() => {
    if (!window.google || !addressQuery) return;

    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      const service = new window.google.maps.places.AutocompleteService();
      service.getPlacePredictions(
        {
          input: addressQuery,
          componentRestrictions: { country: "us" },
        },
        (predictions, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            setAutocompleteResults(predictions || []);
          }
        }
      );
    }, 300);
  }, [addressQuery]);

  useEffect(() => {
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    if (name in formData.location) {
      setFormData(prev => ({
        ...prev,
        location: {
          ...prev.location,
          [name]: value,
        },
      }));
    }
  };

  const handleSelectResult = (result: any) => {
    const placesService = new window.google.maps.places.PlacesService(document.createElement("div"));
  
    placesService.getDetails({ placeId: result.place_id }, (place: any, status) => {
      if (status !== window.google.maps.places.PlacesServiceStatus.OK || !place?.geometry) return;
  
      const latitude = place.geometry.location.lat();
      const longitude = place.geometry.location.lng();
  
      const components = place.address_components || [];
      const getComponent = (type: string) =>
        components.find((comp: any) => comp.types.includes(type))?.long_name || "";
  
      const streetNumber = getComponent("street_number");
      const route = getComponent("route");
      const addressLine1 = [streetNumber, route].filter(Boolean).join(" "); // e.g., "123 Main St"
  
      const stateFullName = getComponent("administrative_area_level_1");
      const stateData = findStateByFullName(stateFullName);

      setFormData(prev => ({
        ...prev,
        location: {
          addressLine1,
          addressLine2: "",
          city: getComponent("locality") || getComponent("sublocality") || "",
          state: stateData?.value || stateFullName,
          zipcode: getComponent("postal_code"),
          latitude,
          longitude,
        },
      }));
  
      setSelectedResult(`${addressLine1}, ${getComponent("locality")}, ${stateData?.value || stateFullName}`);
      setAutocompleteResults([]);
    });
  };
  


  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      if (currentAccount) {
        const res = await updateAccountById(currentAccount._id, formData);
        console.log(res);
      }
    } catch (error) {
      console.error("Failed to update account:", error);
    }
  };

  if (!currentAccount || currentAccount.location) return null;

  return (
    <div>
      <RequiredModal isOpen={!accountLocation?.addressLine1} title="Address is Required">
        <form onSubmit={handleSubmit}>
          <div className={styles.input_container_2_rows}>
            
            <div className={styles.autocompleteWrapper}>
              <TextInput
                name="addressLine1"
                id="accountLocationAddressLine1"
                label="Address Line 1"
                ref={addressInputRef}
                value={formData.location.addressLine1}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData((prev) => ({
                    ...prev,
                    location: {
                      ...prev.location,
                      addressLine1: value,
                    },
                  }));
                  setAddressQuery(value);
                }}
                required
              />

              <div className={styles.autocompleteInput}>
                {autocompleteResults.length > 0 && formData.location.addressLine1.length != 0&& (
                <div className={styles.autocompleteResults}>
                  {autocompleteResults.map((result, index) => (
                    <div
                      key={index}
                      className={styles.autocompleteResult}
                      onClick={() => handleSelectResult(result)}
                      style={{ cursor: "pointer" }}
                    >
                      {result.description}
                    </div>
                  ))}
              </div>
            )}
              </div>
            </div>

            

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
            icon={<Icon category="Check" width={24} height={24} />}
          />
        </form>
      </RequiredModal>
    </div>
  );
};

export default AccountsLocationForm;








// import { ChangeEvent, FormEvent, useEffect, useState } from "react"
// import { useAuthContext } from "../../../contexts/AuthContext"
// import RequiredModal from "../../Modals/RequiredModal"
// import TextInput from "../../Controls/inputs/text/TextInput"

// import styles from './AccountsLocationForm.module.css'
// import SelectInput from "../../Controls/selects/SelectInput"

// import states from "../../../datas/states/states"
// import Button from "../../Controls/buttons/Button"
// import Icon from "../../Icon/Icon"
// import { updateAccountById } from "../../../services/accountService"

// const AccountsLocationForm = () => {

//   //check if the account location has been filled out if not display the form
//   const { currentAccount } = useAuthContext()

//   const [accountLocation, setAccountLocation] = useState<Record<string, any> | null>(null)
//   const [formData, setFormData] = useState({
//     location: {
//       addressLine1: "",
//       addressLine2: "",
//       city: "",
//       state: "CT",
//       zipcode: "",
//     }
//   })

//   useEffect(() => {

//     setAccountLocation(currentAccount?.location)
//   }, [accountLocation])

//   const handleSubmit = async (event: FormEvent) => {
//     event.preventDefault()

//     try {
//       const res = await updateAccountById(currentAccount!._id,formData)

//       console.log(res)
//     } catch (error) {
      
//     }
//   }

//   const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = event.target;
  
//     if (name in formData.location) {
//       setFormData(prev => ({
//         ...prev,
//         location: {
//           ...prev.location,
//           [name]: value
//         }
//       }));
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         [name]: value
//       }));
//     }
//   };
  

//   if (!currentAccount) return null;
//   if (currentAccount.location) return null;

//   return (
//     <div>

//       <RequiredModal
//        isOpen={!accountLocation?.location}
//        title="Address is Required"
//       >
//         <form onSubmit={handleSubmit}>

//           <div className={styles.input_container_2_rows}>
//             <TextInput
//               name="addressLine1"
//               id="accountLocationAddressLine1"
//               label="Address Line 1"
//               value={formData.location.addressLine1}
//               onChange={handleChange}
//               required
//             />

//             <TextInput
//               name="addressLine2"
//               id="accountLocationAddressLine2"
//               label="Address Line 2 / Apt. #"
//               value={formData.location.addressLine2}
//               onChange={handleChange}
//             />
//           </div>

//           <div className={styles.input_container_2_rows}>
//             <TextInput
//              name="city"
//              id="accountLocationCity"
//              label="City"
//              value={formData.location.city}
//              onChange={handleChange}
//              required
//             />
            
//             <SelectInput
//              name="state"
//              id="accountLocationState"
//              label="State"
//              value={formData.location.state}
//              options={states}
//              onChange={handleChange}
//             />
//           </div>

//           <div className={styles.input_container_2_rows}>
//             <TextInput
//              name="zipcode"
//              id="zipcode"
//              label="Zipcode"
//              value={formData.location.zipcode}
//              onChange={handleChange}
//              validPattern={/^\d{5}(-\d{4})?$/}
//              inputMode="numeric"
//              required
//             />
//           </div>

//           <Button
//            type="submit"
//            title="Save"
//            icon={<Icon category="Check" width={24} height={24}/>}
//           />
//         </form>
//       </RequiredModal>

//     </div>
//   )
// }

// export default AccountsLocationForm