import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ArticleSearch from '../Components/ArticleSearch'
import SearchBar from '../Components/SearchBar'
import Loader from '../Components/Loader'
import {searchAction} from '../actions/articleActions'

function SearchArticlesScreen({history, match}) {
    const dispatch = useDispatch()
    const articlesList = useSelector(state => state.search)
    const {loading, error, articles} = articlesList
    const [searchKeyword, setSearchKeyword] = useState()
    const keyword =  match.params.name

    useEffect(() => {
        dispatch(searchAction(keyword))
        setSearchKeyword(history?.location?.state?.search)
    }, [dispatch, history, match ])

    return (
        <React.Fragment>
            <div>
                <SearchBar keyword={searchKeyword} />
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

export default SearchArticlesScreen
