import React, {useState} from 'react'
import { Image, ListGroup, Button, Form } from 'react-bootstrap'
import photo from  '../user.png'
import ReactHtmlParser from 'react-html-parser'
import classes from './css/ArticleDetail.module.css'
import classes1 from './css/Tags.module.css'
import { useHistory } from 'react-router'

function ArticleDetail({article, children}) {
    const history = useHistory()
    
    return (
        <div>
            <div style={{borderRadius: 10, backgroundColor: '#fff', padding: 25, marginBottom: 25}}>
                    <span>
                        <Image src={article.customer?.image} width="24px" height="24px" />&nbsp;
                        <span>{article.customer?.username}</span>&nbsp;
                        <span>{article?.date?.slice(0, 10)} в {article?.date?.slice(11, 16)}</span>&nbsp;
                    </span>

                        <h1><b>{article.headline}</b></h1>
                    <p>
                        <small style={{color: 'rgba(0,0,0,.55)', borderRadius: '5px', border: '2px solid #bbbcc4', padding: 2, marginRight: 15}}>{article?.category?.name}</small>
                        {article?.tags?.map((tag, index)=>(
                            <span className={classes1.Tag} onClick={() => history.push({pathname: `/search/tags/articles/${tag.name}/`, state: {'search' : tag.name}})} key={index}>#{tag.name} </span>
                        ))}
                    </p>
                    <div style={{background: '#fff', borderRadius: 10, padding: 8, border: '1px solid #bbbcc4'}}>
                        <Image src={article.picture} fluid style={{width: '100%', borderRadius: 10, textAlign: '-webkit-center'}} />
                        <div className={classes.Image}>{ReactHtmlParser(article.text)}</div>
                    </div>
            </div>
            {children}
        </div>
    )
}

export default ArticleDetail
