import { InvalidTokenError } from "jwt-decode"

const url = "https://localhost:44344/api"

export const GroupListAPI = {
    
    async getPublicGroups(token) {
        
        return fetch(`${url}/group`, {
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
                    const { error = "Error fetching groups"} = await response.json()
                    throw Error(error)
                  }
                  return await response.json()
            })
},

    
    async patchGroupMember(groupId, token) {
      //patch 
      return fetch(`${url}/group/${groupId}/join`, {
        method: "POST",
        headers: {
          'Authorization': 'Bearer ' + token,
          "Access-Control-Allow-Credentials" : true,
          'Content-Type': 'application/json',
        }
      })
        .then(async response => {
          if(!response.ok) {
            const { error = "Error occured while adding user to group in database"} = await response.json()
            throw Error(error)
          }
          return await response.json()
        })
        .catch(error => {
          console.log(error)
          return null
        })

    }



}