import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import FormContainer from '../Components/FormContainer'

function LoginScreen({location, history}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'
    const userLogin = useSelector(state => state.userLogin)
    const {error, loading, userInfo} = userLogin

    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(username, password))
    }
    
    return (
        <FormContainer>
            <h1>Войти</h1>
            <hr></hr>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='username'>
                    <Form.Label>Имя аккаунта</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Введите имя аккаунта...'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Пароль аккаунта</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Введите пароль аккаунта...'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type="submit" variant="dark">
                    Войти
                </Button>
            </Form>
        </FormContainer>
    )
}

export default LoginScreen
