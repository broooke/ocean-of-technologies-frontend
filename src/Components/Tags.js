import React from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import classes from './css/Tags.module.css'

function Tags({tags}) {
    let history = useHistory()
    return (
        <div style={{background: '#E7F3F9', borderRadius: '10px', padding: 20, marginTop: 25}}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <h5 style={{margin: 0, padding: 0}}><b>Теги</b></h5>
                <i style={{color: '#eac5af', fontSize: 20}} className="fas fa-tag"></i>
            </div>
            <hr style={{height: 1.5, backgroundColor: 'gray'}}/>
            {tags.map((tag, index) => (
            <div style={{display: 'flex', justifyContent: 'space-between'}} key={index}>
                <div className={classes.Tag} onClick={() => history.push({pathname: `/search/tags/articles/${tag.name}/`, state: {'search' : tag.name}})}>#{tag.name}</div>
                <div>{index + 15*1.5}</div>
            </div>
            ))}
        </div>
    )
}

export default Tags
