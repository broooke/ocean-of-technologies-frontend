import React from 'react'
import SearchBar from '../Components/SearchBar'
import ArticleSearch from '../Components/ArticleSearch'

function TagSearchArticles() {
    
    return (
        <React.Fragment>
            <div>
                <SearchBar />
                <ArticleSearch />
            </div>
        </React.Fragment>
    )
}

export default TagSearchArticles
