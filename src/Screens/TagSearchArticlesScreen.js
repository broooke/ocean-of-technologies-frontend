import React, {useEffect} from 'react'
import SearchTagBar from '../Components/SearchTagBar'
import ArticleSearchTag from '../Components/ArticleSearchTag'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Components/Loader'
import { searchTagAction } from '../actions/articleActions'

function TagSearchArticlesScreen({history, match}) {
    const dispatch = useDispatch()
    const articlesList = useSelector(state => state.searchTag)
    const {loading, error, articles} = articlesList
    const keyword = match.params.name

    useEffect(() => {
        dispatch(searchTagAction(keyword))
    }, [dispatch, history, match])
    
    return (
        <React.Fragment>
            <div>
                <SearchTagBar keyword={keyword} articlesNumber={articles.length} />
                {
                loading ? <Loader />
                    : error ? <h3>{error}</h3>
                        :
                        <React.Fragment>
                        {articles.map((article, index) => (
                            <ArticleSearchTag key={index} article={article} />
                        ))}
                        </React.Fragment>
                }
            </div>
        </React.Fragment>
    )
}

export default TagSearchArticlesScreen
