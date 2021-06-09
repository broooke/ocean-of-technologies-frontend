import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {articleListReducer, articleDetailReducer, articleRightColumnReducer, mailReducer, searchArticleReducer, searchArticlesTagReducer, createCommentReducer, createArticleReducer, getTagsReducer} from './reducers/articleReducers'
import { userLoginReducer, userRegisterReducer, userUpdateReducer, userSupportReducer } from './reducers/userReducers'
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
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userUpdate: userUpdateReducer,
    createArticle: createArticleReducer,
    getTags: getTagsReducer,
    supportUser: userSupportReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogin: { userInfo: userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store