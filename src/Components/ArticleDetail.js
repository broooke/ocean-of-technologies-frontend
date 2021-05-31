import React from 'react'
import { Image } from 'react-bootstrap'
import photo from  '../user.png'
import ReactHtmlParser from 'react-html-parser'
import classes from './css/ArticleDetail.module.css'

function ArticleDetail({article}) {

    return (
        <div>
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
            
            <Image src={article.picture} fluid />
            <div className={classes.Image}>{ReactHtmlParser(article.text)}</div>
        </div>
    )
}

export default ArticleDetail
