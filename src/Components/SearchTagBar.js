import React from 'react'

function SearchTagBar({keyword}) {
    return (
        <div style={{background: '#E7F3F9', padding: 20}}>
            <div className='text-center'>
                <p style={{color: '#686C7D'}}>Результаты поиска по тегу</p>
                <h4><b>«{keyword}»</b></h4>
                <small>15 статьей найдено</small>
            </div>
        </div>
    )
}

export default SearchTagBar
