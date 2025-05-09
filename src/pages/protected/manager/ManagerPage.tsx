import { useAuthContext } from "../../../contexts/AuthContext";
import Icon from "../../../components/Icon/Icon";
import styles from './ManagerPage.module.css';
import MultiPageContainer from "../../../components/MultiPageContainer/MultiPageContainer";
import { FormEvent, useMemo, useRef, useState } from "react";
import IntroAd from "./components/IntroAd";
import GoLive from "./components/GoLive";
import SelectUploadFirstAd from "./components/SelectUploadFirstAd";
import AvailableDisplays from "./components/AvailableDisplays";
import DisplaysLocatorMap from "./components/DisplayLocatorMap";

const ManagerPage = () => {
  
  const [formData, setFormData] = useState({
    selectedDisplay: {}
  })
  const { currentAccount, user } = useAuthContext();
  const handleNextPageRef = useRef<() => void>(() => {});

  const callFunctionOne = () => {
    if (handleNextPageRef.current) handleNextPageRef.current()
  };

  const handleSelectedDisplay = (selectedDisplay: any) => {
    setFormData({...formData, selectedDisplay})
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(formData)
  }

  const pages = useMemo(() => {
    if(user!.role === 'Proprietor') {
      return [
        <IntroAd beginAd={callFunctionOne}/>,
        <AvailableDisplays handleForm={handleSelectedDisplay}/>,
        <SelectUploadFirstAd />,
        <GoLive/>
      ]
    } else {
      //
      return [
        <DisplaysLocatorMap />,
        <>Once the location is selected show the screens available for that location to post Ads to with some metrics</>,
        
      ]
    }
  }, []); // stable reference

  if (!currentAccount) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '470px' }}>
        <Icon category='Loading' width={50} height={50} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {currentAccount.ads && currentAccount.ads.length > 0 ? (
        <>add more ads</>
      ) : (
        //renders only if there is no Ads added yet
        <form onSubmit={handleSubmit}>
          <MultiPageContainer
            pages={pages}
            name="createFirstAd"
            functionOne={(fn) => { handleNextPageRef.current = fn }}
          />
        </form>
      )}
    </div>
  );
};

export default ManagerPage;
