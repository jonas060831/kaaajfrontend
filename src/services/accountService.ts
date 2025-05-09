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

const search = async (query: string): Promise<any> => {

  //im looking for all the business that updated their location and their role is Proprietor
  //only apply the search if this is the specific value
  if(query === 'Proprietor') {

    try {


      const options = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
        }
      const res = await fetch(`${BASE_URL}/search?role=${query}`,options)
      return await res.json()

    } catch (error: any) {
      throw new Error(error.message)
    }

  }
}

const fetchAccounts = async (accountIds: string[]): Promise<any[]> => {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      };
  
      const fetches = accountIds.map(id =>
        fetch(`${BASE_URL}/${id}`, options).then(res => {
          if (!res.ok) throw new Error(`Failed to fetch account ${id}`);
          return res.json();
        })
      );
  
      return await Promise.all(fetches);
    } catch (error: any) {
      throw new Error(error.message);
    }
};

const fetchAccountById = async (accountId: string): Promise<any> => {
  try {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
         Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }

    const result = await fetch(`${BASE_URL}/${accountId}`, options)

    const data = await result.json()

    return data


  } catch (error: any) {
    throw new Error(error.message)
  }
}

const updateAccountById = async (accountId: string, accountData: any): Promise<any> => {
  try {
      const options = {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(accountData)
      }

      const res = await fetch(`${BASE_URL}/${accountId}`, options)

      return res.json()

  } catch (error: any) {
    return { error: error.message }
  }
}

export {
    index,
    search,
    fetchAccounts,
    fetchAccountById,
    updateAccountById
}