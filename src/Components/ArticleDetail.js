import React, {useEffect, useState} from 'react'
import { Image } from 'react-bootstrap'
import ReactHtmlParser from 'react-html-parser'
import classes from './css/ArticleDetail.module.css'
import classes1 from './css/Tags.module.css'
import { useHistory } from 'react-router'
import { useLocation } from "react-router-dom"

function ArticleDetail({article, children}) {
    const history = useHistory()
    const { pathname } = useLocation()
    useEffect(()=>{
        window.scrollTo(0, 0);
    }, [pathname])

    return (
        <div>
            <div style={{borderRadius: 10, backgroundColor: '#fff', padding: 25, marginBottom: 25}}>
                    <span>
                        <Image src={article.customer?.image} style={{borderRadius: 6}} width="24px" height="24px" />&nbsp;
                        <span style={{fontSize: 14}}><b>{article.customer?.username}</b></span>&nbsp;
                        <span style={{color: '#9194a1', fontSize: 14}}>{article?.date?.slice(0, 10)} в {article?.date?.slice(11, 16)}</span>&nbsp;
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
                        <hr></hr>
                        <div className={classes.Image}>{ReactHtmlParser(article.text)}</div>
                    </div>
            </div>
            {children}
        </div>
    )
}

export default ArticleDetail
