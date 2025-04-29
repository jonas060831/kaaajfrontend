const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL || 'http://localhost:4000'}/api/users`

const profile = async (loggedInUserId: string) => {
    try {
        
        const options = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
               Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        }

        const res = await fetch(`${BASE_URL}/${loggedInUserId}`, options)
        const profile = await res.json()

        return profile


    } catch (error: any) {
        throw new Error(error.message)
    }
}

export {
    profile
}