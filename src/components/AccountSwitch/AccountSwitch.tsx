import { useEffect, useState, useRef } from "react";
import { profile } from "../../services/userService";
import { fetchAccountById, fetchAccounts } from "../../services/accountService";
import { useAuthContext } from "../../contexts/AuthContext";
import Icon from "../Icon/Icon";
import styles from "./AccountSwitch.module.css";




interface Account {
  _id: string;
  name: string;
  [key: string]: any;
}

interface UserProfile {
  _id: string;
  name: string;
  accounts: {
    default: string;
    list: Account[];
  };
  [key: string]: any;
}

const AccountSwitch = () => {
  const { user, currentAccount, setCurrentAccount } = useAuthContext();
  const [authedUser, setAuthedUser] = useState<UserProfile | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const hideTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const handleMouseEnter = () => {
    if (hideTimeout.current) {
      clearTimeout(hideTimeout.current);
    }
    setShowDropdown(true);
  };
  
  const handleMouseLeave = () => {
    hideTimeout.current = setTimeout(() => {
      setShowDropdown(false);
    }, 200); // Delay in ms – adjust as needed
  };


  const fetchData = async () => {
    if (!user?._id) return;

    setLoading(true);
    setCurrentAccount(null)
    try {

      //get the profile to get other fields
      const { user: loggedInUser } = await profile(user._id);
      setAuthedUser(loggedInUser);

      //loop thru all users account and get only their id
      const accountIds = loggedInUser.accounts.list.map((account: Account) => account._id)

      //fetch each data of that account id
      const allAccounts = await fetchAccounts(...accountIds)

      //filter the default account by this user from all accounts fetch
      const defaultAccount = allAccounts.find(account => account._id === loggedInUser.accounts.default)


      setCurrentAccount(defaultAccount ?? null);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccountClick = async (account: Account) => {

    const updatedAccount = await fetchAccountById(account._id)

    setCurrentAccount(updatedAccount);

    setShowDropdown(false);
  };

  const handleCreateAccount = () => {
    alert("Redirect to account creation flow");
  };

  return (
    <div
      className={styles.accountSwitcher}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className={styles.selectedAccount}>
        {loading ? (
          <Icon category="Loading" width={16} height={16} />
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', maxWidth: '150px' }}>
            <Icon category="Switch" height={20} width={20}/>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {currentAccount?.name}
            </span>
          </div>
        )}
      </button>

      {showDropdown && (
        <div className={styles.dropdown}>
          {authedUser?.accounts?.list?.map((account) => (
            <div
              key={account._id}
              className={`${styles.accountItem} ${currentAccount?._id === account._id ? styles.active : ""}`}
              onClick={() => handleAccountClick(account)}
            >
              <span style={{ width: '15px' }}>
                {
                account.live ? 
                  <Icon category="GreenIndicator" width={8} height={8}/>
                  :
                  <Icon category="RedIndicator" width={8} height={8} />
                }
              </span>

              <span style={{ width: '98%' }}>
                {account.name}
              </span>
              
              <span style={{ color: 'green' }}>
                {account._id === authedUser.accounts.default ? <Icon  category="DefaultIndicator" width={10} height={10}/> : null}
              </span>
            </div>
          ))}

          <button className={styles.createButton} onClick={handleCreateAccount}>
            + Create New Account
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountSwitch;