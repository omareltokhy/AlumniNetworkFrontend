const url = "https://localhost:44344/api/post"


export const FeedAPI = {
    async getTimelinePosts(token, post) {
        return fetch(`${url}/timeline`, {
            method: "POST",
            headers: {
              'Authorization': 'Bearer ' + token,
              "Access-Control-Allow-Credentials" : true,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(post)
          })
            .then(async response => {
              if(!response.ok) {
                const { error = "Error occured while fetching posts for timeline"} = await response.json()
                throw Error(error)
              }
              return await response.json()
            })
            .catch(error => {
              console.log(error)
              return null
            })
        },
    async getSinglePost(token, id) {
      return fetch(`${url}/${id}`, {
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
            const { error = "Error occured while fetching single post of timeline"} = await response.json()
            throw Error(error)
          }
          return await response.json()
        })
        .catch(async response => {
          return null
        })
    },
    async getAllReplies(token, id) {
      return fetch(`${url}/reply/${id}`, {
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
            const { error = "Error occured while fetching single post of timeline"} = await response.json()
            throw Error(error)
          }
          return await response.json()
        })
        .catch(async response => {
          return null
        })
    },
    async sendPost(token, post) {
      return fetch(`${url}`, {
        method: "POST",
        headers: {
          'Authorization': 'Bearer ' + token,
          "Access-Control-Allow-Credentials" : true,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post)
      })
        .then(async response => {
          if(!response.ok) {
            const { error = "Error occured while posting new post"} = await response.json()
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