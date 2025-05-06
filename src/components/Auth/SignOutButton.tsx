import { useNavigate } from "react-router"
import { useAuthContext } from "../../contexts/AuthContext"
import Button from "../Controls/buttons/Button"
import Icon from "../Icon/Icon"

const SignOutButton = () => {
  
  const { clearUser } = useAuthContext()
  const navigate = useNavigate()
  const handleClick = () => {
    clearUser()
    navigate('/')
  }
  return <Button
  title="Sign Out"
  icon={<Icon category="Off" width={24} height={24} />}
  onClick={handleClick}
  />
}

export default SignOutButton