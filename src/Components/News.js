import React from 'react'

function News({articles}) {
    return (
        <div style={{background: '#E7F3F9', borderRadius: '10px', padding: 20}}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <h5 style={{margin: 0, padding: 0}}><b>Последние новости</b></h5>
                <i style={{color: '#2ce095', fontSize: 20}} className="far fa-newspaper"></i>
            </div>
            <hr style={{height: 1.5, backgroundColor: 'gray'}}/>
            {articles.map((article, index) => (
            <div key={index}>
                <span style={{display: 'flex', justifyContent: 'space-between'}}>
                    <small style={{color: '#9194a1', fontSize: 14}}>{article.date.slice(0, 10)} в {article.date.slice(11, 16)}</small>&nbsp;
                    <small style={{color: '#9194a1', fontSize: 14}}><i className='fas fa-eye'></i> {article.views}</small>
                </span>
                <p style={{fontWeight: 'bold'}}>{article.headline}</p>
            </div>
            ))}
        </div>
    )
}

export default News
