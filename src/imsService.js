let requestOptions = {
    method: 'GET',
   headers: {
       Accept: 'application/json',
   },

};

export const getLmsData = (pageSize =1,pageLimit= 20) => {
    return fetch(`http://localhost:3000/leads?_page=${pageSize}&_limit=${pageLimit}`, requestOptions)
}