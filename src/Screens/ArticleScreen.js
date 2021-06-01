import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailArticle } from '../actions/articleActions'
import ArticleDetail from '../Components/ArticleDetail'
import {createCommentAction} from '../actions/articleActions'
import { Container, Row, Col, Form, Button, ListGroup, Image } from 'react-bootstrap'
import photo from  '../user.png'
import RightColumn from '../Components/RightColumn'
import Loader from '../Components/Loader'
import Menu from "../Components/Menu"
import StickyBox from "react-sticky-box"
import classes from '../Components/css/ArticleDetail.module.css'

function Article({match}) {
    const dispatch = useDispatch()
    const [comment, setComment] = useState('')
    const articleDetails = useSelector(state => state.articleDetail)
    const {loading, error, article} = articleDetails
    const createComment = useSelector(state => state.createComment)
    const {loading:commentLoading, success:commentSuccess, error:commentError} = createComment
    console.log(comment)

    useEffect(() => {

        dispatch(detailArticle(match.params.url))
    }, [dispatch, match])

    const submitHandler = (event) => {
        event.preventDefault()
        dispatch(createCommentAction(article.id, comment))
    }  

 
    return (
        <React.Fragment>
        <Menu />
        <div style={{marginTop: 25}}>
            <Container>
            {
            loading ? <Loader />
                : error ? <h3>{error}</h3>
                    :
                    (
                    <Row>
                        <Col xs={9}>

                            {article && <ArticleDetail article={article}>
                            <div>
                                <h4>Комментарии</h4>
                                {article.comments.length===0 && <p>Нет комментариев</p>}
                                <Form onSubmit={submitHandler}>
                                <div style={{marginBottom: 10, borderRadius: 8, backgroundColor: '#F7F7F8', padding: 25}}>
                                    <div style={{backgroundColor: '#fff', padding: 8, border: '1px solid #bbbcc4', borderRadius: 5}}>
                                        <Form.Control value={comment} onChange={(event) => setComment(event.target.value)} as="textarea" placeholder="Введите комментарий..." className={classes.TextArea}></Form.Control>
                                        <div className="d-grid gap-2 mt-1">
                                        <Button type="submit" variant="outline-primary" size="lg">Комментировать</Button>
                                        </div>
                                    </div>
                                </div>
                                </Form>
                                <ListGroup variant='flush'>
                                        {article.comments.map((comment)=>(
                                            <ListGroup.Item key={comment.id}>
                                                <Image src={photo} width="24px" height="24px" />&nbsp;
                                                <strong>{comment.customer.username}</strong>
                                                <p>{comment.date}</p>
                                                <p>{comment.text}</p>
                                            </ListGroup.Item>
                                        ))}
                                </ListGroup>
                            </div>
                            </ArticleDetail>}

                        </Col>
                        <Col style={{maxWidth: '380px', marginLeft: 'auto'}} xs={3}>
                        <StickyBox offsetTop={80} offsetBottom={20}>
                            <RightColumn />
                        </StickyBox>
                        </Col>
                    </Row>
                    )
            }
            </Container>
        </div>
        </React.Fragment>
    )
}

export default Article
