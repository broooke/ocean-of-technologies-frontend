import React, {useEffect} from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Article from '../Components/Article'
import RightColumn from '../Components/RightColumn'
import { useDispatch, useSelector } from 'react-redux'
import { listArticles } from '../actions/articleActions'
import Loader from '../Components/Loader'
import Menu from "../Components/Menu"
import StickyBox from "react-sticky-box"


function Articles({history}) {
    const dispatch = useDispatch()
    const articleList = useSelector(state => state.articleList)
    const {error, loading, articles} = articleList

    const keyword = history.location.search
    
    useEffect(() => {
        dispatch(listArticles(keyword))
    }, [dispatch, keyword])

    return (
        <React.Fragment>
        <Menu />
        <Container style={{marginTop: 25}}>
            {
            loading ? <Loader />
                : error ? <h3>{error}</h3>
                    : 
                    <Row>
                        <Col xs={9}>
                            {articles.map((article, index) => (
                                <Article article={article} key={index} />
                            ))}
                        </Col>
                        <Col style={{maxWidth: '380px', marginLeft: 'auto'}} xs={3}>
                        <StickyBox offsetTop={80} offsetBottom={20}>
                            <RightColumn />
                        </StickyBox>
                        </Col>
                    </Row>
            }
        </Container>
        </React.Fragment>
    )
}

export default Articles
