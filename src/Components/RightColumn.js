import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { rightColumnArticle } from '../actions/articleActions'
import Digest from './Digest'
import News from './News'
import PopularNews from './PopularNews'
import Tags from './Tags'

function RightColumn() {
    const dispatch = useDispatch()

    const articlesRightColumn = useSelector(state => state.articleRightColumn)
    const {loading, error, lastArticles, popularArticles, tags} = articlesRightColumn

    useEffect(() => {
        dispatch(rightColumnArticle())
    }, [dispatch])
    return (
        <div>
            {
            loading ? null
                : error ? <h3>{error}</h3>
                    :
                    (
                        <React.Fragment>
                            {lastArticles && <News articles={lastArticles} />}
                            <Digest />
                            {popularArticles && <PopularNews articles={popularArticles} />}
                            {tags && <Tags tags={tags} />}
                        </React.Fragment>
                    )
            }
        </div>
    )
}

export default RightColumn
