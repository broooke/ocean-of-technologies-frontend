import React from 'react'
import classes from './css/Tags.module.css'
import { Image, Col, Row } from 'react-bootstrap'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'

function ArticleSearchTag({article}) {
    const history = useHistory()
    return (
        <div>
            <Row className="justify-content-md-center">
            <Col xs={5}>
                <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                    <div>
                        <Image src={article.customer.image} style={{borderRadius: 6}} width="24px" height="24px" />&nbsp;
                        <span style={{fontSize: 14}}><b>{article.customer.username}</b></span>&nbsp;
                        <span style={{color: '#9194a1', fontSize: 14}}>{article.date.slice(0, 10)} в {article.date.slice(11, 16)}</span>&nbsp;
                    </div>
                    <div>
                        <span style={{color: '#9194a1'}}><i className='fas fa-eye'></i> {article.views}</span>&nbsp; &nbsp;
                        <span style={{color: '#9194a1'}}><i className='fas fa-comment'></i> {article.number_comments}</span>&nbsp;
                    </div>
                </div>

                <Link style={{textDecoration: 'none', color: 'black'}} to={`/articles/${article.url}`}>
                <h6>
                    {article.headline}
                </h6>
                </Link>

                <p>
                    <small style={{color: 'rgba(0,0,0,.55)', borderRadius: '5px', border: '2px solid #bbbcc4', padding: 2, marginRight: 15}}>{article.category.name}</small>
                    {article?.tags?.map((tag, index)=>(
                        <span onClick={() => history.push({pathname: `/search/tags/articles/${tag.name}/`, state: {'search' : tag.name}})} className={classes.Tag} key={index}>#{tag.name} </span>
                    ))}
                </p>
            </Col>
            </Row>
        </div>
    )
}

export default ArticleSearchTag

