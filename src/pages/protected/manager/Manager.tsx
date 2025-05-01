import { useAuthContext } from "../../../contexts/AuthContext";
import Icon from "../../../components/Icon/Icon";
import styles from './Manager.module.css';
import MultiPageContainer from "../../../components/MultiPageContainer/MultiPageContainer";
import { FormEvent, useMemo, useRef, useState } from "react";
import IntroAd from "./components/IntroAd";
import AvailableDevices from "./components/AvailableDevices";
import GoLive from "./components/GoLive";

const Manager = () => {
  
  const [formData, setFormData] = useState({
    selectedDisplay: {}
  })
  const { currentAccount } = useAuthContext();
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

  const pages = useMemo(() => [
    <IntroAd beginAd={callFunctionOne}/>,
    <AvailableDevices handleForm={handleSelectedDisplay}/>,
    <GoLive/>
  ], []); // stable reference

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

export default Manager;
