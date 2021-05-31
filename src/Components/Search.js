import React, { useState } from 'react'
import {Form, FormControl, InputGroup, Button} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

function Search() {

    let history = useHistory()

    const [search, setSearch] = useState('')

    const submitHandler = (event) => {
      event.preventDefault()
      history.push({pathname: `/search/articles/${search}/`, state: {search}})
    }

    return (
        <Form onSubmit={submitHandler} style={{marginLeft: 'auto'}}>
            <InputGroup className="mb-3">
                <FormControl
                  placeholder="Поиск"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  onChange={event => setSearch(event.target.value)}
                />
                <InputGroup.Append>
                  <Button type="submit" variant="outline-secondary">Поиск</Button>
                </InputGroup.Append>
              </InputGroup>
        </Form>
    )
}

export default Search
