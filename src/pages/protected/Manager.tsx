import { useNavigate } from "react-router";
import { useAuthContext } from "../../contexts/AuthContext";
import { useEffect } from "react";
import Icon from "../../components/Icon/Icon";

const Manager = () => {

   const { user, currentAccount } = useAuthContext();
   const navigate = useNavigate()
   
   useEffect(() => {

        if(!user) navigate('/signin')
   }, [])

   console.log(currentAccount)
  if(!currentAccount) {
    return (
        <Icon category='Loading' width={50} height={50}/>
    )
  }

  return (
    <div>
        {
            JSON.stringify(currentAccount)
        }
        {
        currentAccount.ads ? 
            <>add more ads</>
            :
            <>create your first Ad</>
        }
    </div>
  )
}

export default Manager