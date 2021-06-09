import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { supportUserAction } from '../actions/userActions'

function HelpScreen() {
    const [email, setEmail] = useState('')
    const [text, setText] = useState('')

    const dispatch = useDispatch()

    const supportUser = useSelector(state => state.supportUser)
    const {loading, error, success} = supportUser

    const submitHandler = () => {
        dispatch(supportUserAction({
            email,
            text
        }))
    }

    return (
        <div>
            <Container>
                <Row className="justify-content-md-center">
                    <Col style={{borderRadius: 10, backgroundColor: '#fff', padding: 25, marginTop: 25}} xs={12} md={9}>
                        <h5>Задать вопрос</h5>
                        <hr></hr>
                        <Form onSubmit={submitHandler}>
                            <Form.Group>
                                <Form.Label>Адрес электронной почты</Form.Label>
                                <Form.Control type='email' placeholder='Введите ваш email...' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Вопрос</Form.Label>
                                <Form.Control as="textarea" type='text' placeholder='Опишите ваш вопрос...' value={text} onChange={(e) => setText(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Button className='mt-2' type='submit'>Отправить</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default HelpScreen
