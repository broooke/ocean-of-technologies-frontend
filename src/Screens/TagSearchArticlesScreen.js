import React, {useEffect, useState} from 'react'
import SearchTagBar from '../Components/SearchTagBar'
import ArticleSearch from '../Components/ArticleSearch'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Components/Loader'
import { searchTagAction } from '../actions/articleActions'

function TagSearchArticlesScreen({history, match}) {
    const dispatch = useDispatch()
    const articlesList = useSelector(state => state.searchTag)
    const {loading, error, articles} = articlesList
    const [searchKeyword, setSearchKeyword] = useState()
    const keyword = match.params.name

    useEffect(() => {
        dispatch(searchTagAction(keyword))
        setSearchKeyword(history?.location?.state?.search)
    }, [dispatch, history, match])
    
    return (
        <React.Fragment>
            <div>
                <SearchTagBar keyword={searchKeyword} />
                {
                loading ? <Loader />
                    : error ? <h3>{error}</h3>
                        :
                        <React.Fragment>
                        {articles.map((article, index) => (
                            <ArticleSearch key={index} article={article} />
                        ))}
                        </React.Fragment>
                }
            </div>
        </React.Fragment>
    )
}

export default TagSearchArticlesScreen
