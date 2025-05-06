import { ChangeEvent, FormEvent, useState } from "react"
import { signUp } from "../../services/authService"
import { useAuthContext } from "../../contexts/AuthContext"
import { useNavigate } from "react-router-dom"

import styles from './SignInPage.module.css'
import Button from "../../components/Controls/buttons/Button"
import Icon from "../../components/Icon/Icon"
import TextInput from "../../components/Controls/inputs/text/TextInput"
import PasswordInput from "../../components/Controls/inputs/password/PasswordInput"
import InlineError from "../../components/Errors/InlineError"

const SignUpPage = () => {

  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    username: '',
    password: '',
    repeatpassword: '',
    businessName: ''
  })
  const [serverMessage, setServerMessage] = useState<null | string>()
  const [loading, setLoading] = useState<boolean>(false)

  
  const { setUser } = useAuthContext()
  const navigate = useNavigate()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    try {
        const response = await signUp(formData)
        
        setUser(response!)
        navigate('/')
        setFormData({
          firstName: '',
          middleName: '',
          lastName: '',
          username: '',
          password: '',
          repeatpassword: '',
          businessName: ''
        })
        setLoading(false)

    } catch (error: any) {
        

        const errorArray = error.message.split(',')
        let formattedError = ''
        if(errorArray.length > 1) {
            errorArray.map((error:any) => {
                formattedError += `• ${error} \n`
            })

            setServerMessage(formattedError)
        } else {
            setServerMessage(`• ${error.message}`)
        }

        setLoading(false)
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) :void => setFormData({...formData, [event.target.name] : event.target.value})
  return (
    <div className={styles.container} style={{ marginTop: '1.7rem' }}>

        <div>
          <h1>KaaaJ Advertisement</h1>

          <InlineError
           icon={<></>}
           onClose={() => setServerMessage(null)}
           isOpen={serverMessage ? true : false}
          >

            <p
             style={{
              whiteSpace: 'pre-wrap',
              fontSize: '14px',
              lineHeight: '2rem',
              fontFamily: 'Varela Round'
             }}
            >
              {serverMessage}
            </p>

          </InlineError>
          
        </div>

        <div>
          <h1>Sign Up</h1>

          <h6 style={{ marginTop: '-1rem'}} >
            LED Partners Signup
          </h6>
          
          
          
          <form onSubmit={handleSubmit}>

            <h6 style={{ marginBottom: '-0.5rem' }}>personal</h6>
            
            <div style={{ display: 'flex', gap: '1rem', flex: '1fr 0.5fr' }}>
              <TextInput
                name='firstName'
                id='signUpPageFirstName'
                label='First Name'
                value={formData.firstName}
                onChange={handleChange}
                required
              />

              <TextInput
                name='middleName'
                id='signUpPageMiddleName'
                label='Middle Name'
                value={formData.middleName}
                onChange={handleChange}
              />
            </div>

            

            <TextInput
              name='lastName'
              id='signUpPageLastName'
              label='Last Name'
              value={formData.lastName}
              onChange={handleChange}
              required
            />

            <h6 style={{ marginBottom: '-0.5rem' }}>credentials</h6>
            <TextInput
              name='username'
              id='signUpPageUsername'
              label='Email'
              value={formData.username}
              onChange={handleChange}
              required
              validPattern={/^[^\s@]+@[^\s@]+\.[^\s@]+$/} //valid email regex
            />

            <PasswordInput
              name="password"
              id="signUpPagePassword"
              label="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <PasswordInput
              name="repeatpassword"
              id="signUpPageRepeatPassword"
              label="Repeat-Password"
              value={formData.repeatpassword}
              onChange={handleChange}
              required
            />

            <h6 style={{ marginBottom: '-0.5rem' }}>Business Information</h6>

            <TextInput
              name='businessName'
              id='signUpPageBusinnessName'
              label='Business Name'
              value={formData.businessName}
              onChange={handleChange}
              required
            />
            <Button
              title='Sign Up'
              type='submit'
              isLoading={loading}
              icon={<Icon category="RightArrow" width={24} height={24}/> }
            />

          </form>
        </div>
    </div>
  )
}

export default SignUpPage