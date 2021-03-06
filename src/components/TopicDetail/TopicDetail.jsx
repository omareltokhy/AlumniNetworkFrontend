import { useSelector } from "react-redux";
import { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import { useParams } from "react-router-dom"
import withKeycloak from "../../hoc/WithKeycloak"
import CalendarComponent from "../Calendar/CalendarComponent"
import { TopicListApi } from "../TopicList/TopicListApi";
import FeedItem from "../Feed/FeedItem"


//Returns topic details page
const TopicDetail = () => {

    const {topicid} = useParams()
	
	const [posts, setPosts] = useState([])
	const [events, setEvents] = useState({
		events: [],
		fetching: true
	})
    const [userReply, setUsersReply] = useState("")


	//Search functionality for topics posts
	const [searchTerm, setSearchTerm] = useState("")
	const [isBasicView, setIsBasicView] = useState(true)
	
	const changeSearchTerm = ( event ) => {
		setSearchTerm(
			event.target.value
		)

	}
	
	const { token } = useSelector(state => state.tokenReducer)
	const { id } = useSelector(state => state.userReducer)

	//Gets topics posts and events from database
	useEffect(() => {
		TopicListApi.getTopicPosts(token, topicid)
			.then(allPost => {
				if (allPost !== null) {
					setPosts(allPost)
				}
			})
			
			TopicListApi.getTopicEvents(token, topicid)
			.then(allEvent => {
				if (allEvent != null) {
					setEvents({
						events: allEvent,
						fetching: false
					})
				}
			})
	}, [])

	const handleReply = event => {
        event.preventDefault()
        const newReply = {
            text: userReply,
            targetTopic: topicid,
            members: [
                {
                    id: id
                }
            ]
        }
        TopicListApi.sendPost(token, newReply)
            .then(response => {
                setPosts(prevState => ([response,...prevState]))
            })
			setUsersReply("")
    }

	const handleTextArea = event => {
        event.preventDefault()
        setUsersReply(event.target.value)
    }
    
	return (
		<Container>
				<div className="row w-75 mx-auto">
					<div className="col-10">
						<h2 className="mt-3">Topic Timeline</h2>
					</div>
					<div className="col-2">
						<input className="border-danger rounded mt-3 ms-auto" type="text" placeholder="search..." onChange={changeSearchTerm} ></input>
					</div>
				</div>
				<div className="row w-75 mx-auto mt-5">
					<div className="col">
				<		button className="btn btn-outline-danger"onClick={() => setIsBasicView(!isBasicView)}>Change view</button>

					</div>
				</div>
				<div>

				</div>
				{isBasicView ? 
					<div className="container">
					<div className="card my-4 w-75 mx-auto">
						<div className="card-header">
							<form onSubmit={handleReply}>
								<div className="form-group">
									<label htmlFor="replyToUser">Send message to feed</label>
									<textarea onChange={handleTextArea} value={userReply} className="form-control" id="replyToUser" rows="3" placeholder="What's on your mind?" required></textarea>
								</div>
								<button type="submit" className="btn btn-primary float-end my-2">Send a message</button>
							</form>
						</div>
					</div>
					<ul className="list-group mb-2 w-75 mx-auto">
						{posts.filter((post) => {
                   
                   if (searchTerm === "") {
                       return post 
                   }
                   else if (post.text.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())) {
                       return post
                   }
               }).map(post => <FeedItem key={post.id} post={post} />)}
					</ul>
				</div> 
				: <CalendarComponent events={events.events} />} 
		</Container>
	)
}
export default withKeycloak(TopicDetail)