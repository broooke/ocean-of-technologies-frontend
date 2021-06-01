import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {articleListReducer, articleDetailReducer, articleRightColumnReducer, mailReducer, searchArticleReducer, searchArticlesTagReducer, createCommentReducer} from './reducers/articleReducers'
import axios from 'axios'

axios.defaults.baseURL = "http://127.0.0.1:8000/"

const reducer = combineReducers({
    articleList:articleListReducer,
    articleDetail:articleDetailReducer,
    articleRightColumn: articleRightColumnReducer,
    mail: mailReducer,
    search: searchArticleReducer,
    searchTag: searchArticlesTagReducer,
    createComment: createCommentReducer,
})

const initialState = {}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store