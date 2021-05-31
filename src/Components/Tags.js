import React from 'react'
import { Link } from 'react-router-dom'

function Tags({tags}) {
    return (
        <div style={{background: '#E7F3F9', borderRadius: '10px', padding: 20, marginTop: 25}}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <h5 style={{margin: 0, padding: 0}}><b>Теги</b></h5>
                <i style={{color: '#eac5af', fontSize: 20}} className="fas fa-tag"></i>
            </div>
            <hr style={{height: 1.5, backgroundColor: 'gray'}}/>
            {tags.map((tag, index) => (
            <div style={{display: 'flex', justifyContent: 'space-between'}} key={index}>
                <Link>
                <div>#{tag.name}</div>
                </Link>
                <div>{index + 15*1.5}</div>
            </div>
            ))}
        </div>
    )
}

export default Tags
