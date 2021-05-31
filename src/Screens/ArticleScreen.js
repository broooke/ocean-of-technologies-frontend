import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailArticle } from '../actions/articleActions'
import ArticleDetail from '../Components/ArticleDetail'
import { Container, Row, Col } from 'react-bootstrap'
import RightColumn from '../Components/RightColumn'
import Loader from '../Components/Loader'
import Menu from "../Components/Menu"

function Article({match}) {
    const dispatch = useDispatch()

    const articleDetails = useSelector(state => state.articleDetail)
    const {loading, error, article} = articleDetails

    useEffect(() => {
        dispatch(detailArticle(match.params.url))
    }, [dispatch, match])

 
    return (
        <React.Fragment>
        <Menu />
        <div>
            <Container>
            {
            loading ? <Loader />
                : error ? <h3>{error}</h3>
                    :
                    (
                    <Row>
                        <Col xs={8}>
                            {article && <ArticleDetail article={article} />}
                        </Col>
                        <Col style={{maxWidth: '380px', marginLeft: 'auto'}} xs={4}>
                            <RightColumn />
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
