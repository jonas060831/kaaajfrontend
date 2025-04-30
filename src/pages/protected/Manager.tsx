import { useAuthContext } from "../../contexts/AuthContext";
import Icon from "../../components/Icon/Icon";
import styles from './Manager.module.css';
import MultiPageContainer from "../../components/MultiPageContainer/MultiPageContainer";
import CircleButton from "../../components/Controls/buttons/CircleButton";
import { useMemo, useRef } from "react";

const Manager = () => {
  const { currentAccount } = useAuthContext();
  const handleNextPageRef = useRef<() => void>(() => {});

  const callFunctionOne = () => {
    if (handleNextPageRef.current) handleNextPageRef.current()
  };

  

  const pages = useMemo(() => [
    <div
      key="create-first-ad"
      style={{
        display: 'flex',
        height: '450px',
        width: '850px',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem'
      }}
    >
      Get Started with Your First Ad
      <CircleButton
        onClick={callFunctionOne}
        icon={<Icon category="Plus" width={24} height={24} />}
      />
    </div>,
    <div key="second-page"
      style={{
        display: 'flex',
        height: '450px',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem'
      }}
    >
      Recommended Devices for Your Storefront Measurements 
    </div>
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
        <MultiPageContainer
          pages={pages}
          name="createFirstAd"
          functionOne={(fn) => { handleNextPageRef.current = fn }}
        />
      )}
    </div>
  );
};

export default Manager;
