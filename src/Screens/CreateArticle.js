import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { useDispatch, useSelector } from 'react-redux'
import {CreateArticleAction, GetTagsAction} from '../actions/articleActions'
import Select from 'react-select';

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

const categories = [
    {'label': 'Программирование', 'value': 'Программирование'},
    {'label': 'Devops', 'value': 'Devops'},
]

function CreateArticle() {
    const [text, setText] = useState('')
    const [headline, setHeadline] = useState('')
    const [tagsList, setTagsList] = useState([])
    const [category, setCategory] = useState('')
    const [url, setUrl] = useState('')
    const [image, setImage] = useState('')

    const dispatch = useDispatch()

    const allTags = useSelector(state => state.getTags)
    const {tags, loading, error} = allTags

    const userLogin = useSelector(state=>state.userLogin)
    const {error: userError, loading: userLoading, userInfo} = userLogin

    useEffect(() => {
        dispatch(GetTagsAction())
    }, [dispatch])


    const ckeditorChangeHandler = (e, editor) => {
        const data = editor.getData()
        setText(data)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('headline', headline)
        formData.append('text', text)
        formData.append('tagsList', JSON.stringify(tagsList))
        formData.append('category', category)
        formData.append('url', url)
        formData.append('image', image)
        formData.append('customer', userInfo.id)
        dispatch(CreateArticleAction(formData))
    }

    const selectHandler = (e) => {
        const options = e
        setTagsList(options)
    }

    const uploadFileHandler = async (event) => {
        const file = event.target.files[0]
        setImage(file)
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
                            <Form.Control onChange={uploadFileHandler} className="form-control" type='file' id='formFile1'></Form.Control>
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
                            <Select
                                placeholder='Добавьте тег...'
                                isMulti
                                name="tags"
                                options={tags.map((tag) =>{
                                    return {'value': tag.name, 'label': tag.name}
                                })}
                                onChange={selectHandler}
                                closeMenuOnSelect={false}
                                className="basic-multi-select"
                                classNamePrefix="select"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Категория</Form.Label>
                            <Select
                                placeholder='Выберите категорию...'
                                name="category"
                                options={categories}
                                onChange={(e) => setCategory(e.value)}
                                closeMenuOnSelect={false}
                                className="basic-single"
                                classNamePrefix="select"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label style={{margin: 0}}>URL статьи</Form.Label><br></br>
                            <Form.Text className="text-muted">
                            Данный url будет отбражаться в адресной строке. Пример: https://oceanoftechnologies.com/articles/'ваш url'
                            </Form.Text>
                            <Form.Control type='text' placeholder='Введите url...' value={url} onChange={(e) => setUrl(e.target.value)}></Form.Control>
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
