const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL || 'http://localhost:4000'}/api/accounts`

const index = async () : Promise<void>=> {
    try {
        
        const options = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
               Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        }

        const res = await fetch(`${BASE_URL}`, options)

        const data = res.json()

        console.log(data)


    } catch (error: any) {
        throw new Error(error.message)
    }
}

const defaultAccount = async (accountId: String): Promise<void> => {

    try {

        const options = {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
        const res = await fetch(`${BASE_URL}/${accountId}`, options)

        const data = await res.json()

        console.log(data)

        return data

    } catch (error: any) {
        throw new Error(error.message)
    }

}

export {
    index,
    defaultAccount
}