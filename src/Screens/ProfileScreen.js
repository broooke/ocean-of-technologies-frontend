import React, { useEffect, useState } from 'react'
import { Col, Image, Row, Nav, Container, Form, Button, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { updateUser } from '../actions/userActions'
import {USER_UPDATE_RESET, USER_LOGIN_SUCCESS} from '../constants/userConstants'
import LoaderCircle from '../Components/LoaderCircle'

function ProfileScreen({history}) {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [uploading, setUploading] = useState(false)
    const [profileUpdate, setProfileUpdate] = useState(false)
    const dispatch = useDispatch()


    const userLogin = useSelector(state=>state.userLogin)
    const {error, loading, userInfo} = userLogin

    const userUpdate = useSelector(state => state.userUpdate)
	const {error:errorUpdate, loading:loadingUpdate, success:successUpdate} = userUpdate

    useEffect(()=>{
        if (userInfo) {
            setUsername(userInfo.username)
            setEmail(userInfo.email)
        } else{
            history.push('/')
        }
        if(successUpdate) {
            setProfileUpdate(true)
            dispatch({type:USER_UPDATE_RESET})
        }
    }, [dispatch, userInfo, history, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({
            username,
            email,
        }))
    }
    console.log(userInfo)

    const uploadFileHandler = async (event) => {
        const file = event.target.files[0]
        const formData = new FormData()

        formData.append('image', file)

        setUploading(true)

        try{
            const config = {
				headers:{
					'Content-Type':'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`
				}
			}

			const {data} = await axios.post('/api/users/upload/', formData, config)
			setUploading(false)
        }catch(error){
            setUploading(false)
        }
    }
    return (
        <div>
        <Container>
            <Row>
                <Col style={{borderRadius: 10, backgroundColor: '#fff', padding: 25, marginTop: 20}} xs={4}>
                    <div>
                        <h5>Профиль</h5>
                    </div>
                    <hr></hr>
                    <div>
                        {userInfo && <Image style={{borderRadius: '50%', border: '1px solid gray'}} src={userInfo.image} fluid  /> }
                    </div>
                    <hr></hr>
                    <div>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Link href="#/profile/">Данные</Nav.Link>
                        </Nav>
                    </div>
                </Col>
                <Col style={{borderRadius: 10, backgroundColor: '#fff', padding: 25, marginLeft: 15, marginTop: 20}}>
                <div>
                    <h5>Ваши данные</h5>
                </div>
                <hr></hr>
                {loading ? <LoaderCircle /> :
                    error ? <Alert className='mt-2' variant='danger'>{error}</Alert>
                    : (
                        <Form onSubmit={submitHandler}>
                        <Form.Group controlId='username'>
                            <Form.Label>Имя пользователя</Form.Label>
                            <Form.Control type='name' placeholder='Введите имя пользователя...' value={username} onChange={(e) => setUsername(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group className='mt-2' id='image'>
                            <Form.Label>Аватар</Form.Label>
                            {uploading ? <div style={{textAlign: 'center'}}><LoaderCircle /></div> : (
                                    <Form.Control onChange={uploadFileHandler} className="form-control" type='file' id='formFile'></Form.Control>
                            )}
                        </Form.Group>
                        <Form.Group className='mt-2' controlId='email'>
                            <Form.Label>Адрес электронной почты</Form.Label>
                            <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" type='name'></Form.Control>
                        </Form.Group>
                            
                        <div className="d-grid gap-2 mt-3">
                            <Button variant="outline-primary" type='submit' size="lg">Обновить</Button>
                        </div>
                        {errorUpdate && <Alert className='mt-2' variant='danger'>{errorUpdate}</Alert>}
                        {profileUpdate && <Alert className='mt-2' variant='success'>Профиль обновлен</Alert>}
                    </Form>
                )}

                </Col>
            </Row>
        </Container>
        </div>
    )
}

export default ProfileScreen
