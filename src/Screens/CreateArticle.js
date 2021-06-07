import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { useDispatch, useSelector } from 'react-redux'
import {CreateArticleAction} from '../actions/articleActions'

const editorConfiguration = {	
    toolbar: {
        items: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            'codeBlock',
            'code',
            'bulletedList',
            'numberedList',
            '|',
            'outdent',
            'indent',
            'alignment',
            '|',
            'imageUpload',
            'blockQuote',
            'insertTable',
            'mediaEmbed',
            'undo',
            'redo',
            '|',
            'fontColor',
            'fontSize',
            'fontFamily'
        ]
    },
    language: 'ru',
    image: {
        toolbar: [
            'imageTextAlternative',
            'imageStyle:full',
            'imageStyle:side'
        ]
    },
    table: {
        contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells'
        ]
    },
    licenseKey: '',
}



function CreateArticle() {
    const [text, setText] = useState('')
    const [headline, setHeadline] = useState('')

    const dispatch = useDispatch()

    const right_column = useSelector(state => state.articleRightColumn)
    const {tags} = right_column
    console.log(right_column)


    const ckeditorChangeHandler = (e, editor) => {
        const data = editor.getData()
        setText(data)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(CreateArticleAction({
            headline,
            text
        }))
    }


    return (
        <div>
            <Container>
            <Row className="justify-content-md-center">
                <Col style={{borderRadius: 10, backgroundColor: '#fff', padding: 25, marginTop: 25}} xs={12} md={9}>
                    <h5>Создание статьи</h5>
                    <hr></hr>
                    <Form onSubmit={submitHandler}>
                        <Form.Group>
                            <Form.Label>Название</Form.Label>
                            <Form.Control type='text' placeholder='Введите название статьи...' value={headline} onChange={(e) => setHeadline(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Заставка</Form.Label>
                            <Form.Control className="form-control" type='file' id='formFile'></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Содержание статьи</Form.Label>
                            <CKEditor
                                editor={ Editor }
                                config={ editorConfiguration }
                                onChange={ckeditorChangeHandler}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Теги
                            </Form.Label>
                            <Form.Control as="select" defaultValue="Choose...">
                                <option>Выберите тег</option>
                                <option></option>
                            </Form.Control>
                        </Form.Group>
                        <Button className='mt-2' type='submit'>Отправить</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
        </div>
    )
}

export default CreateArticle
