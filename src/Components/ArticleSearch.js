import React from 'react'
import photo from  '../user.png'
import { Image, Col, Row } from 'react-bootstrap'

function ArticleSearch({article, keyword}) {
    const keywords = keyword.split(' ')
    const headline = article.headline.split(' ')
    const new_headline = []

    for (let i=0; i<=headline.length; i++) {
        for (let b=0; b<=keywords.length; b++) {
            if (headline[i]?.toLowerCase().includes(keywords[b]?.toLowerCase())) {
                new_headline.push(headline.indexOf(headline[i])) 
            }
        }
    }

    return (
        <div>
            <Row className="justify-content-md-center">
            <Col xs={5}>
                <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                    <div>
                        <Image src={article.customer.image} width="24px" height="24px" />&nbsp;
                        <span>Username</span>&nbsp;
                        <span>{article.date.slice(0, 10)} в {article.date.slice(11, 16)}</span>&nbsp;
                    </div>
                    <div>
                        <span><i className='fas fa-eye'></i> {article.views}</span>&nbsp; &nbsp;
                        <span><i className='fas fa-comment'></i> {article.number_comments}</span>&nbsp;
                    </div>
                </div>
                <h6>
                    {headline.map((word, index) => {
                        // eslint-disable-next-line no-lone-blocks
                        if (new_headline.includes(headline.indexOf(word))) {
                            return <span key={index} style={{background: 'yellow'}}>{word} </span>
                        } else {
                            return <span key={index}>{word} </span>
                        }
                    })}
                </h6>
                <p>
                    <small style={{color: 'rgba(0,0,0,.55)', borderRadius: '5px', border: '2px solid #bbbcc4', padding: 2}}>{article.category.name}</small>
                </p>
            </Col>
            </Row>
        </div>
    )
}

export default ArticleSearch
