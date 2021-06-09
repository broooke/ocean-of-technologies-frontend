import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormControl, InputGroup,Button, Form, Alert } from 'react-bootstrap'
import { mailAction } from '../actions/articleActions'
import LoaderCircle from './LoaderCircle'

function Digest() {
  const [email, setEmail] = useState('')

  const dispatch = useDispatch()

  const digestInfo = useSelector(state => state.mail)
  const {loading, success, error} = digestInfo
  const changeHandler = (event) => {
    setEmail(event.target.value)
  }

  const submitHandler = (event) => {
    event.preventDefault()
    setEmail('')
    dispatch(mailAction(email))
  }

    return (
        <div style={{background: '#E7F3F9', borderRadius: '10px', padding: 20, marginTop: 25}}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <h5 style={{margin: 0, padding: 0}}><b>Дайджест</b></h5>
                <i style={{color: '#6dbae0', fontSize: 20}} className="far fa-paper-plane"></i>
            </div>
            <hr style={{height: 1.5, backgroundColor: 'gray'}}/>
            {loading ? (<div style={{textAlign: 'center'}}><LoaderCircle /></div>) : (
              <div>
              <small>Только самое важное!</small>
              <Form onSubmit={submitHandler}>
                <InputGroup className="mb-3">
                  <FormControl
                    type="email"
                    onChange={changeHandler}
                    placeholder="Email"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    value={email}
                    required
                  />
                  <InputGroup.Append>
                    <Button type="submit" variant="outline-secondary">Подписаться</Button>
                  </InputGroup.Append>
                </InputGroup>
              </Form>
              </div>
            )}
            {error ? (
              <Alert className='mt-2' variant="danger">{error}</Alert>
            ): null}
            {success ? (
              <Alert className='mt-2' variant="success">Вы подписались на "Дайджест"</Alert>
            ): null}
        </div>
    )
}

export default Digest
