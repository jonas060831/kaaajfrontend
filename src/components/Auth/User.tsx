import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { profile } from "../../services/userService";
import Icon from "../Icon/Icon";

type PersonalType = {
    firstName: string;
    middleName: string;
    lastName: string;
}
export type LoggedInUser = {
    personal: PersonalType
    role: string
    username: string
    _id: string
}


const User = () => {

  const { user } = useAuthContext()
      
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser| null>(null)


  useEffect(() => {

    const fetchLoggedInUser = async () => {

        const { user: authedUser } = await profile(user!._id)

        setLoggedInUser(authedUser)
    }

    fetchLoggedInUser()
  }, [])

  return (
    <>
        {loggedInUser ? loggedInUser.personal.firstName : <Icon  category="Loading" width={24} height={24}/>}
    </>
  )
}

export default User