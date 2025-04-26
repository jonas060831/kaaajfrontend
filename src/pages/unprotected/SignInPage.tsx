
import { ChangeEvent, FormEvent, useState } from 'react'
import TextInput from '../../components/Controls/inputs/text/TextInput'
import styles from './SignInPage.module.css'
import PasswordInput from '../../components/Controls/inputs/password/PasswordInput'
import Button from '../../components/Controls/buttons/Button'
import Icon from '../../components/Icon/Icon'

const SignInPage = () => {

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [event.target.name]: event.target.value})
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    console.log(formData)
  }
  return (
    <div className={styles.container}>

        <div>
          <h1>KaaaJ Advertisement</h1>
        </div>

        <div>

            <h1>Sign In</h1>
            <h6 style={{ marginTop: '-1rem' }}>username and password credentials</h6>
            <form onSubmit={handleSubmit}>

              <TextInput name='username' id='signInPageUsername' label='Email' value={formData.username} onChange={handleChange} />
              <PasswordInput name='password' id='signInPagePassword' label='Password' value={formData.password} onChange={handleChange}/>
              <Button title='Sign In' type='submit' icon={<Icon category='RightArrow' width={35} height={35}/>} />
            </form>
        </div>

    </div>
  )
}

export default SignInPage