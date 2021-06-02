import React, {useState} from 'react'
import { Image, ListGroup, Button, Form } from 'react-bootstrap'
import photo from  '../user.png'
import ReactHtmlParser from 'react-html-parser'
import classes from './css/ArticleDetail.module.css'

function ArticleDetail({article, children}) {
    
    return (
        <div>
            <div style={{borderRadius: 10, backgroundColor: '#F7F7F8', padding: 25, marginBottom: 25}}>
                    <span>
                        <Image src={photo} width="24px" height="24px" />&nbsp;
                        <span>Username</span>&nbsp;
                        <span>{article?.date?.slice(0, 10)} в {article?.date?.slice(11, 16)}</span>&nbsp;
                    </span>

                        <h1><b>{article.headline}</b></h1>
                    <p>
                        <small style={{color: 'rgba(0,0,0,.55)', borderRadius: '5px', border: '2px solid #bbbcc4', padding: 2, marginRight: 15}}>{article?.category?.name}</small>
                        {article?.tags?.map((tag, index)=>(
                            <span key={index}>#{tag.name} </span>
                        ))}
                    </p>
                    <div style={{background: '#fff', borderRadius: 10, padding: 8, border: '1px solid #bbbcc4'}}>
                    <Image src={article.picture} fluid />
                    <div className={classes.Image}>{ReactHtmlParser(article.text)}</div>
                    </div>
            </div>
            {children}
        </div>
    )
}

export default ArticleDetail
