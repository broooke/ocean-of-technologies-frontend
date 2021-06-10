import React from 'react'
import { Image } from 'react-bootstrap'
import photo from '../python.jpg'

function PopularNews({articles}) {
    return (
        <div style={{background: '#E7F3F9', borderRadius: '10px', padding: 20, marginTop: 25}}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <h5 style={{margin: 0, padding: 0}}><b>Популярно сейчас</b></h5>
                <i style={{color: 'orange', fontSize: 20}} className='fas fa-fire'></i>
            </div>
            <hr style={{height: 1.5, backgroundColor: 'gray'}}/>
                {articles.map((article, index)=>(
                    <div key={index}>
                        <Image src={article.picture} fluid style={{borderRadius: 5}} />
                        <p style={{margin: 0, padding: 0}}><b>{article.headline}</b></p>
                        <span style={{display: 'flex', justifyContent: 'space-between'}}>
                            <small style={{color: '#9194a1', fontSize: 14}}>{article.date.slice(0, 10)} в {article.date.slice(11, 16)}</small>&nbsp;
                            <small style={{color: '#9194a1', fontSize: 14}}><i className='fas fa-eye'></i> {article.views}</small>
                        </span>
                    </div>
                ))}
        </div>
    )
}

export default PopularNews
