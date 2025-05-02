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

export {
    index,
    fetchAccounts,
    fetchAccountById
}