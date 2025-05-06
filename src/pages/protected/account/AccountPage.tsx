
import SignOutButton from "../../../components/Auth/SignOutButton";
import User from "../../../components/Auth/User";


import styles from './AccountPage.module.css'

const AccountPage = () => {
 

  return (
    <div className="container">
        
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
                <h3>Account</h3>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '7rem' }}>
                <User />
            </div>
        </div>
        <hr />

        <div className={styles.navigation_with_display}>
            <SignOutButton />
        </div>
    </div>
  )
}

export default AccountPage