import { ChangeEvent, FormEvent, useState } from "react"
import { signUp } from "../../services/authService"
import { useAuthContext } from "../../contexts/AuthContext"
import { useNavigate } from "react-router-dom"


const SignUpPage = () => {

  const [formData, setFormData] = useState({ username: '', password: '' })
  const [serverMessage, setServerMessage] = useState<null | string>()
  
  const { setUser } = useAuthContext()
  const navigate = useNavigate()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
        const response = await signUp(formData)
        
        setUser(response)
        navigate('/')

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
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) :void => setFormData({...formData, [event.target.name] : event.target.value})
  return (
    <div>
        <h3>Sign Up</h3>
        <p style={{ whiteSpace: 'pre-wrap' }}>{serverMessage} {serverMessage ? <button onClick={ () => setServerMessage(null) }>X</button> : null} </p>
        <form onSubmit={handleSubmit}>

        <label htmlFor="username">username:</label> <br />
                <input
                type="text"
                name="username"
                id="username"
                required
                onChange={handleChange}
                />

                <br />

                <label htmlFor="password">password:</label> <br />
                <input
                type="password"
                name="password"
                id="password"
                required
                onChange={handleChange}
                />
                <br /><br />

                <input type="submit" value="Sign up" />
        </form>

    </div>
  )
}

export default SignUpPage