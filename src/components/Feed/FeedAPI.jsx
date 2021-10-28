const url = "https://localhost:44344/api/post/timeline"


export const FeedAPI = {
    async getTimelinePosts(token, post) {
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
                const { error = "Error occured while fetching posts for timeline"} = await response.json()
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