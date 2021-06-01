import React from 'react'
import { Image, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import photo from  '../user.png'

function Article({article}) {
    return (
        <div>
            <span>
                <Image src={photo} width="24px" height="24px" />&nbsp;
                <span>Username</span>&nbsp;
                <span>{article.date.slice(0, 10)} в {article.date.slice(11, 16)}</span>&nbsp;
            </span>

            <Link style={{textDecoration: 'none', color: 'black'}} to={`/articles/${article.url}`}>
                <h1><b>{article.headline}</b></h1>
            </Link>

            <p>
                <small style={{color: 'rgba(0,0,0,.55)', borderRadius: '5px', border: '2px solid #bbbcc4', padding: 2}}>{article.category.name}</small>
            </p>

            <Image src={article.picture} fluid width="856" />

            <Col style={{borderRadius: '5px', border: '2px solid #bbbcc4', marginTop: '15px', padding: '7px', display: 'inline-block'}}>
                <span>
                    <span><i className='fas fa-eye'></i> {article.views}</span>&nbsp; &nbsp;
                    <span><i className='fas fa-comment'></i> {article.comments.length}</span>&nbsp;
                </span>
            </Col>

            <hr style={{height: 1.5, backgroundColor: 'gray'}} />
        </div>
    )
}

export default Article
