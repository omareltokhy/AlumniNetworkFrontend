const apiURL = "https://alumni-dummy-data-api.herokuapp.com/post"
const url = "https://localhost:44344/api/user/"

export const UserAPI = {
    async getUser(token, id) {
        return fetch(`${url}${id}`, {
          method: "GET",
          headers: {
            'Authorization': 'Bearer ' + token,
            "Access-Control-Allow-Origin" : "*", 
            "Access-Control-Allow-Credentials" : true,
            'Content-Type': 'application/json',
          }
        })
          .then(async response => {
            if(!response.ok) {
              const { error = "Error occured while fetching user in log in"} = await response.json()
              throw Error(error)
            }
            return await response.json()
          })
          .catch(async response => {
            return null
          })
      },
    getPosts(id) {
        return fetch(`${apiURL}?senderId=${id}`)
            .then(async response => {
                if(!response.ok) {
                    const { error = `Error occured while fetching users ${id} posts for user`} = await response.json()
                    throw Error(error)
                }
                return await response.json()
            })
    }
}