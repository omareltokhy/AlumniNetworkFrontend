import { useEffect, useState, useCallback } from "react"
import {useHistory} from 'react-router-dom'
import { Container, Card, Row, Col, Image, Button, Offcanvas, Form } from "react-bootstrap"
import { UserAPI } from "./UserAPI"
import UserPosts from "./UserPosts"
import { useSelector } from "react-redux";
import "./user.css"
import withKeycloak from "../../hoc/WithKeycloak"

const User = () => {

    const history = useHistory();

    const [posts, setPosts] = useState({
        posts: [],
        loading: true
    })
    const { token, name, username, status, bio, funFact } = useSelector(state => state.userReducer)

    const [show, setShow] = useState(false)

    useEffect(() => {
        UserAPI.getPosts(dummyUser.id)
            .then(response => {
                if(response.length) {
                    setPosts({
                        posts: response,
                        loading: false
                    })
                }
            })
    }, [])

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    const dummyUser = {
        id: 3
        }

    const redirectToTopics = useCallback(() => history.push('/topics'), [history])
    const redirectToGroups = useCallback(() => history.push('/groups'), [history])
    const redirectToEvents = useCallback(() => history.push('/events'), [history])

    return (
        <Container>
            <Card.Header className="my-5">
                <Row>
                    <Col xs={2} sm={2} md={3} lg={2}>
                        <Image src={`https://avatars.dicebear.com/api/avataaars/userid${username}.svg`} alt="user profile" className="img-sm" />
                    </Col>
                    <Col>
                        <Card.Title className="mt-2">{name}</Card.Title>
                        <Card.Subtitle>@{username}</Card.Subtitle>
                        <Card.Text className="mt-3">{status}</Card.Text>
                        <Button onClick={redirectToTopics} variant="outline-danger" size="sm">My follows</Button>&nbsp;
                        <Button onClick={redirectToGroups} variant="outline-danger" size="sm" >My groups</Button>&nbsp;
                        <Button onClick={redirectToEvents} variant="outline-danger" size="sm" >My events</Button>&nbsp;
                    </Col>
                    <Col lg={1} className="text-center">
                        <span className="material-icons" onClick={ handleShow} type="button">mode_edit</span>
                    </Col>
                </Row>
            </Card.Header>

            <Card className="mb-5">
                <Card.Header>
                    <Row>
                        <Col lg={11}>
                            <Card.Title>Fun fact</Card.Title>
                            <Card.Subtitle>{funFact}</Card.Subtitle>
                        </Col>
                        <Col lg={1} className="text-center">
                        <span className="material-icons" onClick={ handleShow} type="button">mode_edit</span>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <Card.Title>My bio</Card.Title>
                    <Card.Subtitle>{bio}</Card.Subtitle>
                </Card.Body>
            </Card>

            <Card className="mb-5 card-scroll">
                <Card.Title className="mx-3">Users activity</Card.Title>
                <div className="scrollable">
                    <UserPosts posts={posts.posts} />
                </div>
            </Card>

            <Offcanvas show={show} onHide={handleClose} backdrop={false} scroll={false}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>My settings</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <p>Change your personal information</p>
                   <Form>
                        <Form.Group className="mb-3" controlId="formSettingsName">
                            <Form.Label>Your full name</Form.Label>
                            <Form.Control type="text" placeholder="John Doe" size="sm" ></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formSettingsStatus">
                            <Form.Label>Current work status</Form.Label>
                            <Form.Control type="text" placeholder="Currently working/studying ..." size="sm"></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formSettings" >
                            <Form.Label>Fun fact about yourself</Form.Label>
                            <Form.Control type="textarea" placeholder="Fun fact about me is ..." size="sm"></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formSettingsn" >
                            <Form.Label>Bio</Form.Label>
                            <Form.Control as="textarea" rows={2} placeholder="Tell us more about yourself" size="sm"></Form.Control>
                        </Form.Group>
                        <Form.Group className="float-end">
                            <Button variant="danger" size="sm" className="">Cancel</Button>&nbsp;
                            <Button variant="primary" size="sm" className="">Save Changes</Button>
                        </Form.Group>
                   </Form>
                </Offcanvas.Body>
            </Offcanvas>

        </Container>
    )
}

export default withKeycloak(User)