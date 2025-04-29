import { useEffect, useState } from "react"
import { profile } from '../../services/userService'
import { defaultAccount } from '../../services/accountService'
import { useAuthContext } from "../../contexts/AuthContext"
import Icon from "../Icon/Icon"

import styles from './AccountSwitch.module.css'

const AccountSwitch = () => {

  const { user } = useAuthContext()
  const [loading, setLoading] = useState<boolean>(false)
  const [ authedUser, setAuthedUser ] = useState<any>({})

  useEffect(() => {

    fetchLoggedInUserProfile()
  }, [])

  const fetchLoggedInUserProfile = async () => {
    setLoading(true)
    try {
      const { user: loggedInUser } = await profile(user!._id)

      setAuthedUser(loggedInUser)
      setLoading(false)

    } catch (error) {
      console.log(error)
    }
    
  }

  return (
    <div>

      {
        loading ? (
          <Icon category="Loading" width={24} height={24} />
        ) : (
          <select
           className={styles.accountSelector}
           name="currentAccount"
           id="currentAccount"
          >
            {
              authedUser?.accounts?.list.map((account: any, index: number) => (
                <option key={index} value={account._id || index}>
                  {account.name}
                </option>
              ))
            }
          </select>
        )
      }

    </div>
  )
}

export default AccountSwitch