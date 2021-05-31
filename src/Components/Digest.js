import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { FormControl, InputGroup,Button, Form } from 'react-bootstrap'
import { mailAction } from '../actions/articleActions'

function Digest() {

  const [email, setEmail] = useState('')

  const dispatch = useDispatch()

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
                />
                <InputGroup.Append>
                  <Button type="submit" variant="outline-secondary">Подписаться</Button>
                </InputGroup.Append>
              </InputGroup>
            </Form>
        </div>
    )
}

export default Digest
