const apiURL = "https://alumni-dummy-data-api.herokuapp.com/post"

export const TimelineAPI = {
    getPost() {
        return fetch(apiURL + "?limit=20")
            .then(async (response) => {
                if (!response.ok) {
                    const { error= "Error occured while fetching posts"} = await response.json()
                    throw Error(error)
                }
                return response.json()
            })
    },
    getComments(id) {
        return fetch(`${apiURL}?postId=${id}`)
        .then(async (response) => {
            if (!response.ok) {
                const { error= `Error occured while fetching comment with id ${id}`} = await response.json()
                throw Error(error)
            }
            return await response.json()
        })
    }
}