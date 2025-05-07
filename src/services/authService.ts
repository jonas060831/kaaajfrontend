const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL || 'http://localhost:4000'}/api/auth`

const signUp = async (formData: Record<any, any>, role: string )  => {

    try {
        
        formData.role = role

        formData.personal = {
            firstName : formData.firstName,
            middleName: formData.middleName,
            lastName: formData.lastName
        }

        formData.account = {
            name: formData.businessName
        }

        const options = {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify(formData) //username,password, role
        }
        const res = await fetch(`${BASE_URL}/signup`, options)

        const data = await res.json()

        if(data.error) {
            throw new Error(data.error) //throw error to the front end
        }

        if(data.token) {
            localStorage.setItem('token', data.token) //add to localStorage
            return JSON.parse(atob(data.token.split('.')[1])) //return the json object
        }

        throw new Error('Invalid response from server')

    } catch (error: any) {

        throw new Error(error.message)
    }
}

const signIn = async (formData: Record<any, string> ) => {
    
    try {
        
        const options = {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify(formData) //username and password
        }

        const res = await fetch(`${BASE_URL}/signin`, options)

        const data = await res.json()

        if(data.error) throw new Error(data.error) //throw error to the front end

        if(data.token) {
            localStorage.setItem('token', data.token) //add to localStorage
            return JSON.parse(atob(data.token.split('.')[1])) //return the json object
        }

        throw new Error('Invalid response from server')
        
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export {
    signUp,
    signIn
}