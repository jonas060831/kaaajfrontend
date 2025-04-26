
import { ChangeEvent, FormEvent, useState } from 'react'
import TextInput from '../../components/Controls/inputs/text/TextInput'
import styles from './SignInPage.module.css'
import PasswordInput from '../../components/Controls/inputs/password/PasswordInput'
import Icon from '../../components/Icon/Icon'
import { signIn } from '../../services/authService'
import { useAuthContext } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router'
import DismissModal from '../../components/Modals/DismissModal'
import CircleButton from '../../components/Controls/buttons/CircleButton'

const SignInPage = () => {

  const {  setUser } = useAuthContext()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({ username: '', password: '' })
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [event.target.name]: event.target.value})
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    try {

      const response = await signIn(formData)

      setUser(response)
      navigate('/')
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
              username and password credentials
            </h6>
            
            <form onSubmit={handleSubmit}>

              <TextInput name='username' id='signInPageUsername' label='Email' value={formData.username} onChange={handleChange} />
              <PasswordInput name='password' id='signInPagePassword' label='Password' value={formData.password} onChange={handleChange}/>
              {/* <Button
               title='Sign In'
               type='submit'
               isLoading={loading}
               icon={ }
              /> */}
              <CircleButton
               className='auto'
               type='submit'
               isLoading={loading}
               icon={<Icon category='RightArrow' width={35} height={35}/> }
              />
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