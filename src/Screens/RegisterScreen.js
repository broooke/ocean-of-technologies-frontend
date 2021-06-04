import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'
import FormContainer from '../Components/FormContainer'

function RegisterScreen({location, history}) {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')


    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'
    const userRegister = useSelector(state => state.userRegister)
    const {error, loading, userInfo} = userRegister

    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
            setMessage('Пароли не совпадают')
        }else{
            dispatch(register(username, email, password))
        }
    }

    return (
        <FormContainer>
            <h1>Регистрация</h1>
            {message && <h1>{message}</h1>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='username'>
                    <Form.Label>Имя аккаунта</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Введите имя аккаунта...'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Почта аккаунта</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Введите почту аккаунта...'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Пароль аккаунта</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Введите пароль аккаунта...'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='passwordConfirm'>
                    <Form.Label>Пароль аккаунта</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Введите пароль аккаунта...'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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

export default RegisterScreen
