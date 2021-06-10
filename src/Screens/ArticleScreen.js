import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailArticle } from '../actions/articleActions'
import ArticleDetail from '../Components/ArticleDetail'
import {createCommentAction} from '../actions/articleActions'
import { Container, Row, Col, Form, Button, ListGroup, Image, Alert } from 'react-bootstrap'
import photo from  '../user.png'
import RightColumn from '../Components/RightColumn'
import Loader from '../Components/Loader'
import Menu from "../Components/Menu"
import StickyBox from "react-sticky-box"
import classes from '../Components/css/ArticleDetail.module.css'
import { LinkContainer } from 'react-router-bootstrap'
import LoaderCircle from '../Components/LoaderCircle'
import { CREATE_COMMENT_RESET } from '../constants/articleConstants'


function Article({match}) {
    const dispatch = useDispatch()
    const [comment, setComment] = useState('')
    const articleDetails = useSelector(state => state.articleDetail)
    const {loading, error, article} = articleDetails
    const createComment = useSelector(state => state.createComment)
    const {loading:commentLoading, success:commentSuccess, error:commentError} = createComment
    const [commentId, setCommentId] = useState('')
    const [name, setName] = useState('')
    const [successComment, setCommentSuccess] = useState(false)


    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(() => {
        if (userInfo) setName(userInfo.username)
        if (commentSuccess) {
            setComment('')
            setCommentSuccess(true)
            dispatch({type:CREATE_COMMENT_RESET})
        }
        dispatch(detailArticle(match.params.url))
    }, [dispatch, match, commentSuccess, userInfo])

    const submitHandler = (event) => {
        event.preventDefault()
        const parentId = commentId
        dispatch(createCommentAction(article.id, comment, parentId, name))
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
                                    {userInfo ? (
                                        <Form onSubmit={submitHandler}>
                                        <div style={{marginBottom: 25, borderRadius: 10, backgroundColor: '#fff', padding: 25}}>
                                            <h4>Написать комментарий</h4>
                                                {commentLoading ? (
                                                    <div style={{backgroundColor: '#fff', padding: 8, border: '1px solid #bbbcc4', borderRadius: 10, textAlign: 'center'}}>
                                                        <LoaderCircle />
                                                    </div>
                                                ):(
                                                    <div style={{backgroundColor: '#fff', padding: 8, border: '1px solid #bbbcc4', borderRadius: 10}}>
                                                        <Form.Control required id="contacttext" value={comment} onChange={(event) => setComment(event.target.value)} as="textarea" placeholder="Введите комментарий..." className={classes.TextArea}></Form.Control>
                                                        <div className="d-grid gap-2 mt-1">
                                                        <Button type="submit" variant="outline-primary" size="lg">Комментировать</Button>
                                                        </div>
                                                        {commentError && <Alert className='mt-2' variant='danger'>{commentError}</Alert> }
                                                        {successComment && <Alert className='mt-2' variant='success'>Комментарий создан</Alert> }
                                                    </div>
                                                )}
                                        </div>
                                        </Form>): (
                                        <div style={{marginBottom: 25, borderRadius: 10, backgroundColor: '#fff', padding: 25}}>
                                            <h5>Авторизируетесь для того, чтобы оставить комментарий</h5>
                                            <LinkContainer to='/login'>
                                                <Button>Войти в аккаунт</Button>
                                            </LinkContainer>
                                        </div>
                                    ) }
                                <ListGroup style={{borderRadius: 10, backgroundColor: '#fff', padding: 25, marginBottom: 25}} variant='flush'>
                                    <h4>Комментарии</h4>
                                        {article.comments.length===0 && <Alert variant='warning'>Нет комментариев</Alert>}
                                        {article.comments.map((comment)=>(
                                            <div key={comment.id} style={{border: '1px solid #bbbcc4', padding: 15 ,background: '#fff', borderRadius: 10, marginBottom: 10}}>
                                                <div className='mb-4'>
                                                    <Image style={{borderRadius: 6}} src={comment.customer.image} width="24px" height="24px" />&nbsp;
                                                    <strong>{comment.customer.username}</strong>
                                                    <p style={{color: '#9194a1', fontSize: 14}}>{article?.date?.slice(0, 10)} в {article?.date?.slice(11, 16)}</p>
                                                    <p>{comment.text}</p>
                                                    <Button onClick={(event) => replyHandler(event, comment.id, comment.customer.username)}>Ответить</Button>
                                                </div>
                                                {comment.parent_comments.map((com) => (
                                                    <div style={{borderLeft: '2px solid #bbbcc4', paddingLeft: 30}} key={com.id} className="mx-5">
                                                        <div className='mb-4'>
                                                        <Image style={{borderRadius: 6}} src={com.customer.image} width="24px" height="24px" />&nbsp;
                                                        <strong>{com.customer.username}</strong>
                                                        <p>{com.date}</p>
                                                        <p>{com.text}</p>
                                                        <Button onClick={(event) => replyHandler(event, com.id,com.customer.username)}>Ответить</Button>
                                                        </div>
                                                        <div>
                                                            {com.parent_comments.map((com1)=>(
                                                                <div style={{borderLeft: '2px solid #bbbcc4', paddingLeft: 30}} key={com1.id} className="mx-5">
                                                                    <div className='mb-4'>
                                                                        <Image src={photo} width="24px" height="24px" />&nbsp;
                                                                        <strong>{com1.customer.username}</strong>
                                                                        <p>{com1.date}</p>
                                                                        <p>{com1.text}</p>
                                                                        <Button onClick={(event) => replyHandler(event, com1.id,com1.customer.username)}>Ответить</Button>
                                                                    </div>
                                                                    {com1.parent_comments.map((com2)=>(
                                                                    <div style={{borderLeft: '2px solid #bbbcc4', paddingLeft: 30}} key={com2.id} className="mx-5">
                                                                        <div className='mb-4'>
                                                                            <Image src={photo} width="24px" height="24px" />&nbsp;
                                                                            <strong>{com2.customer.username}</strong>
                                                                            <p>{com2.date}</p>
                                                                            <p>{com2.text}</p>
                                                                            <Button onClick={(event) => replyHandler(event, com2.id,com2.customer.username)}>Ответить</Button>
                                                                        </div>
                                                                        {com2.parent_comments.map((com3)=>(
                                                                        <div style={{borderLeft: '2px solid #bbbcc4', paddingLeft: 30}} key={com3.id} className="mx-5">
                                                                            <div className='mb-4'>
                                                                                <Image src={photo} width="24px" height="24px" />&nbsp;
                                                                                <strong>{com3.customer.username}</strong>
                                                                                <p>{com3.date}</p>
                                                                                <p>{com3.text}</p>
                                                                                <Button onClick={(event) => replyHandler(event, com3.id,com3.customer.username)}>Ответить</Button>
                                                                            </div>
                                                                            {com3.parent_comments.map((com4)=>(
                                                                            <div style={{borderLeft: '2px solid #bbbcc4', paddingLeft: 30}} key={com4.id} className="mx-5">
                                                                                <div className='mb-4'>
                                                                                    <Image src={photo} width="24px" height="24px" />&nbsp;
                                                                                    <strong>{com4.customer.username}</strong>
                                                                                    <p>{com4.date}</p>
                                                                                    <p>{com4.text}</p>
                                                                                    <Button onClick={(event) => replyHandler(event, com4.id,com4.customer.username)}>Ответить</Button>
                                                                                </div>
                                                                                {com4.parent_comments.map((com5)=>(
                                                                                <div style={{borderLeft: '2px solid #bbbcc4', paddingLeft: 30}} key={com5.id} className="mx-5">
                                                                                    <div className='mb-4'>
                                                                                        <Image src={photo} width="24px" height="24px" />&nbsp;
                                                                                        <strong>{com5.customer.username}</strong>
                                                                                        <p>{com5.date}</p>
                                                                                        <p>{com5.text}</p>
                                                                                        <Button onClick={(event) => replyHandler(event, com4.id,com5.customer.username)}>Ответить</Button>
                                                                                    </div>
                                                                                </div>
                                                                                ))}
                                                                            </div>
                                                                            ))}
                                                                        </div>
                                                                        ))}
                                                                    </div>
                                                                    ))}
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
