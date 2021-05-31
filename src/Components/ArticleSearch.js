import React from 'react'
import photo from  '../user.png'
import { Image, Col, Container, Row } from 'react-bootstrap'

function ArticleSearch({article}) {
    return (
        <div>
            <Row className="justify-content-md-center">
            <Col xs={5}>
                <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                    <div>
                        <Image src={photo} width="24px" height="24px" />&nbsp;
                        <span>Username</span>&nbsp;
                        <span>{article.date.slice(0, 10)} в {article.date.slice(11, 16)}</span>&nbsp;
                    </div>
                    <div>
                        <span><i className='fas fa-eye'></i> {article.views}</span>&nbsp; &nbsp;
                        <span><i className='fas fa-comment'></i> 15</span>&nbsp;
                    </div>
                </div>
                <h6>{article.headline}</h6>
                <p>
                    <small style={{color: 'rgba(0,0,0,.55)', borderRadius: '5px', border: '2px solid #bbbcc4', padding: 2}}>{article.category.name}</small>
                </p>
            </Col>
            </Row>
        </div>
    )
}

export default ArticleSearch
