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
    
    SEARCH_TAG_REQUEST,
    SEARCH_TAG_SUCCESS,
    SEARCH_TAG_FAIL,

    CREATE_COMMENT_REQUEST,
    CREATE_COMMENT_SUCCESS,
    CREATE_COMMENT_FAIL,

    CREATE_ARTICLE_REQUEST,
    CREATE_ARTICLE_SUCCESS,
    CREATE_ARTICLE_FAIL,
    GET_TAGS_REQUEST,
    GET_TAGS_SUCCESS,
    GET_TAGS_FAIL,
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

export const articleDetailReducer = (state={article:{comments:[]}}, action) => {
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

export const mailReducer = (state={}, action) => {
    switch (action.type) {
        case MAIL_REQUEST:
            return {loading: true}
        case MAIL_SUCCESS:
            return {loading: false, success: true}
        case MAIL_FAIL:
            return {loading: false, error: action.payload, success: false}
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

export const searchArticlesTagReducer = (state={articles:[]}, action) => {
    switch (action.type) {
        case SEARCH_TAG_REQUEST:
            return {loading: true, ...state}
        case SEARCH_TAG_SUCCESS:
            return {loading: false, articles: action.payload}
        case SEARCH_TAG_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const createCommentReducer = (state={}, action) => {
    switch (action.type) {
        case CREATE_COMMENT_REQUEST:
            return {loading: true}
        case CREATE_COMMENT_SUCCESS:
            return {loading: false, success: true}
        case CREATE_COMMENT_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const createArticleReducer = (state={}, action) => {
    switch (action.type) {
        case CREATE_ARTICLE_REQUEST:
            return {loading: true}
        case CREATE_ARTICLE_SUCCESS:
            return {loading: false, success: true}
        case CREATE_ARTICLE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const getTagsReducer = (state={tags:[]}, action) => {
    switch(action.type) {
        case GET_TAGS_REQUEST:
            return {...state, loading: true}
        case GET_TAGS_SUCCESS:
            return {loading: false, tags: action.payload}
        case GET_TAGS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}