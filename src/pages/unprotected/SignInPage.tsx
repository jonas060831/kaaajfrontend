
import { ChangeEvent, FormEvent, useState } from 'react'
import TextInput from '../../components/Controls/inputs/text/TextInput'
import styles from './SignInPage.module.css'
import PasswordInput from '../../components/Controls/inputs/password/PasswordInput'
import Icon from '../../components/Icon/Icon'
import { signIn } from '../../services/authService'
import { useAuthContext } from '../../contexts/AuthContext'
import { useLocation, useNavigate } from 'react-router'
import DismissModal from '../../components/Modals/DismissModal'
import CircleButton from '../../components/Controls/buttons/CircleButton'
import { Link } from 'react-router-dom'

const SignInPage = () => {

  const { search } = useLocation()
  const queryParams = new URLSearchParams(search)
  const {  setUser } = useAuthContext()
  const navigate = useNavigate()


  const [formData, setFormData] = useState({ username: '', password: '' })
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const userRole = queryParams.get('userRole')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [event.target.name]: event.target.value})
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    try {

      const redirectUrl = queryParams.get('redirectUrl')
      const response = await signIn(formData)
      
      setUser(response)
      
      if(!redirectUrl) navigate('/')
      else navigate(redirectUrl)


    } catch (error: any) {
      console.log(error)
      setIsModalOpen(true)
      setError(error.message)
      
      setLoading(false)
    }
  }
  return (
    <div className={styles.container}>
        
        <div>
          <h1>KaaaJ Advertisement</h1>
        </div>
        
        <div>

            <h1>Sign In</h1>
            
            <h6 style={{ marginTop: '-1rem'}} >
              { userRole === 'Industrialist' ? 'Advertiser Sign In':  'LED Partners Sign In'}
            </h6>
            
            <form onSubmit={handleSubmit}>

              <TextInput
               name='username'
               id='signInPageUsername'
               label='Email'
               value={formData.username}
               onChange={handleChange}
               required
              />
              
              <PasswordInput
               name='password'
               id='signInPagePassword'
               label='Password'
               value={formData.password}
               onChange={handleChange}
               required
              />
              
              <CircleButton
               className='auto'
               type='submit'
               isLoading={loading}
               icon={<Icon category='RightArrow' width={35} height={35}/> }
              />

              <br /><br />
              <Link className={styles.mobile_signup_link} to={userRole === 'Industrialist' ? "/signup?type=Industrialist" : "/signup"} style={{ color: 'var(--font-color)' }} >Sign Up ?</Link>

            </form>

            <DismissModal
             title="Error Message"
             isOpen={isModalOpen}
             onClose={() => setIsModalOpen(false)}
             buttonClassName='danger'
             buttonTitle='Try Again'
            >
              <h3>{error as string}</h3>
            </DismissModal>
        </div>
    </div>
  )
}

export default SignInPage