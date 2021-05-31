import { 
    ARTICLE_LIST_REQUEST,
    ARTICLE_LIST_SUCCESS,
    ARTICLE_LIST_FAIL,

    ARTICLE_DETAIL_REQUEST,
    ARTICLE_DETAIL_SUCCESS,
    ARTICLE_DETAIL_FAIL,

    ARTICLE_RIGHT_COLUMN_REQUEST,
    ARTICLE_RIGHT_COLUMN_SUCCESS,
    ARTICLE_RIGHT_COLUMN_FAIL,

    MAIL_REQUEST,
    MAIL_SUCCESS,
    MAIL_FAIL,

    SEARCH_REQUEST,
    SEARCH_SUCCESS,
    SEARCH_FAIL,
 } from '../constants/articleConstants'

export const articleListReducer = (state={articles:[]}, action) => {
    switch (action.type){
        case ARTICLE_LIST_REQUEST:
            return {loading: true, articles:[]}
        
        case ARTICLE_LIST_SUCCESS:
            return {loading: false, articles:action.payload}

        case ARTICLE_LIST_FAIL:
            return {loading: false, error:action.payload}

        default:
            return state
    }
        
}

export const articleDetailReducer = (state={article:{}}, action) => {
    switch (action.type) {
        case ARTICLE_DETAIL_REQUEST:
            return {loading: true, ...state}
        case ARTICLE_DETAIL_SUCCESS:
            return {loading: false, article: action.payload}
        case ARTICLE_DETAIL_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const articleRightColumnReducer = (state={lastArticles:[], popularArticles:[], tags: []}, action) => {
    switch (action.type) {
        case ARTICLE_RIGHT_COLUMN_REQUEST:
            return {loading: true, ...state}
        case ARTICLE_RIGHT_COLUMN_SUCCESS:
            return {loading: false, lastArticles: action.payload.articlesLast, popularArticles: action.payload.articlesPopular, tags: action.payload.tags}
        case ARTICLE_RIGHT_COLUMN_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const mailReducer = (state={email:{}}, action) => {
    switch (action.type) {
        case MAIL_REQUEST:
            return {loading: true, email: {}}
        case MAIL_SUCCESS:
            return {loading: false, email: action.payload}
        case MAIL_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const searchArticleReducer = (state={articles:[]}, action) => {
    switch (action.type) {
        case SEARCH_REQUEST:
            return {loading: true, ...state}
        case SEARCH_SUCCESS:
            return {loading: false, articles: action.payload}
        case SEARCH_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}