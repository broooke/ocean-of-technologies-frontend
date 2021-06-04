import React from 'react'
import { Image, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import photo from  '../user.png'

function Article({article}) {
    return (
        <div style={{borderRadius: 10, backgroundColor: '#fff', padding: 25, marginBottom: 25}}>
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
                <div style={{background: '#fff', borderRadius: 10, border: '1px solid #bbbcc4', textAlign: '-webkit-center'}}>
                    <Image src={article.picture} fluid style={{width: '100%', borderRadius: 10}} />
                </div>
                <Col style={{borderRadius: '5px', border: '2px solid #bbbcc4', marginTop: '15px', padding: '7px', display: 'inline-block'}}>
                    <span>
                        <span><i className='fas fa-eye'></i> {article.views}</span>&nbsp; &nbsp;
                        <span><i className='fas fa-comment'></i> {article.comments.length}</span>&nbsp;
                    </span>
                </Col>
        </div>
    )
}

export default Article
