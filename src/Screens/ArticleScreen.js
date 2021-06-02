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
    const [commentId, setCommentId] = useState('')

    useEffect(() => {
        if (commentSuccess) setComment('')
        dispatch(detailArticle(match.params.url))
    }, [dispatch, match, commentSuccess])

    const submitHandler = (event) => {
        event.preventDefault()
        const parentId = commentId
        dispatch(createCommentAction(article.id, comment, parentId))
        setCommentId('')
    }

    const replyHandler = (event, commentId, name) => {
        event.preventDefault()
        setCommentId(commentId)
        setComment(name + ', ')
        document.getElementById('contacttext').focus()
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
                                {article.comments.length===0 && <p>Нет комментариев</p>}
                                <Form onSubmit={submitHandler}>
                                <div style={{marginBottom: 25, borderRadius: 10, backgroundColor: '#F7F7F8', padding: 25}}>
                                <h4>Написать комментарий</h4>
                                    <div style={{backgroundColor: '#fff', padding: 8, border: '1px solid #bbbcc4', borderRadius: 10}}>
                                        <Form.Control id="contacttext" value={comment} onChange={(event) => setComment(event.target.value)} as="textarea" placeholder="Введите комментарий..." className={classes.TextArea}></Form.Control>
                                        <div className="d-grid gap-2 mt-1">
                                        <Button type="submit" variant="outline-primary" size="lg">Комментировать</Button>
                                        </div>
                                    </div>
                                </div>
                                </Form>
                                <ListGroup style={{borderRadius: 10, backgroundColor: '#F7F7F8', padding: 25, marginBottom: 25}} variant='flush'>
                                    <h4>Комментарии</h4>
                                        {article.comments.map((comment)=>(
                                            <div key={comment.id} style={{border: '1px solid #bbbcc4', padding: 15 ,background: '#fff', borderRadius: 10, marginBottom: 10}}>
                                                <div>
                                                    <Image src={photo} width="24px" height="24px" />&nbsp;
                                                    <strong>{comment.customer.username}</strong>
                                                    <p>{comment.date}</p>
                                                    <p>{comment.text}</p>
                                                    <Button onClick={(event) => replyHandler(event, comment.id, comment.customer.username)}>Ответить</Button>
                                                </div>
                                                <hr></hr>
                                                {comment.parent_comments.map((com) => (
                                                    <div key={com.id} className="mx-5">
                                                        <Image src={photo} width="24px" height="24px" />&nbsp;
                                                        <strong>{com.customer.username}</strong>
                                                        <p>{com.date}</p>
                                                        <p>{com.text}</p>
                                                        <Button onClick={(event) => replyHandler(event, com.id,com.customer.username)}>Ответить</Button>
                                                        <hr></hr>
                                                        <div>
                                                            {com.parent_comments.map((com1)=>(
                                                                <div key={com1.id} className="mx-5">
                                                                    <Image src={photo} width="24px" height="24px" />&nbsp;
                                                                    <strong>{com1.customer.username}</strong>
                                                                    <p>{com1.date}</p>
                                                                    <p>{com1.text}</p>
                                                                    <Button onClick={(event) => replyHandler(event, com.id,com1.customer.username)}>Ответить</Button>
                                                                    <hr></hr>
                                                                </div>
                                                                
                                                            ))}
                                                        </div>
                                                    </div>                                                   
                                                ))}
                                                
                                            </div>
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
