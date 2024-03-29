import { 
    ARTICLE_LIST_REQUEST,
    ARTICLE_LIST_SUCCESS,
    ARTICLE_LIST_FAIL,

    ARTICLE_DETAIL_FAIL,
    ARTICLE_DETAIL_REQUEST,
    ARTICLE_DETAIL_SUCCESS,

    ARTICLE_RIGHT_COLUMN_FAIL,
    ARTICLE_RIGHT_COLUMN_REQUEST,
    ARTICLE_RIGHT_COLUMN_SUCCESS,

    MAIL_REQUEST,
    MAIL_SUCCESS,
    MAIL_FAIL,

    SEARCH_REQUEST,
    SEARCH_SUCCESS,
    SEARCH_FAIL,

    SEARCH_TAG_FAIL,
    SEARCH_TAG_SUCCESS,
    SEARCH_TAG_REQUEST,

    CREATE_COMMENT_REQUEST,
    CREATE_COMMENT_SUCCESS,
    CREATE_COMMENT_FAIL,

    CREATE_ARTICLE_FAIL,
    CREATE_ARTICLE_REQUEST,
    CREATE_ARTICLE_SUCCESS,
    GET_TAGS_FAIL,
    GET_TAGS_REQUEST,
    GET_TAGS_SUCCESS,
 } from '../constants/articleConstants'
import axios from 'axios'

export const listArticles = (keyword = '') => async (dispatch) => {
    try{
        dispatch({
            type: ARTICLE_LIST_REQUEST
        })

        const {data} = await axios.get(`api/articles${keyword}`)

        dispatch({
            type: ARTICLE_LIST_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: ARTICLE_LIST_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message
                : error.message,
        })
    }
}

export const detailArticle = (url) => async (dispatch) => {
    try{
        dispatch({
            type: ARTICLE_DETAIL_REQUEST
        })

        const {data} = await axios.get(`api/articles/${url}/`)
        dispatch({
            type: ARTICLE_DETAIL_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: ARTICLE_DETAIL_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}

export const rightColumnArticle = () => async (dispatch) => {
    try{
        dispatch({
            type: ARTICLE_RIGHT_COLUMN_REQUEST
        })

        const {data} = await axios.get(`api/popular/articles/`)

        dispatch({
            type: ARTICLE_RIGHT_COLUMN_SUCCESS,
            payload: {
                articlesLast: data.last_articles,
                articlesPopular: data.popular_articles,
                tags: data.tags,
            }
        })

    }catch(error){
        dispatch({
            type: ARTICLE_RIGHT_COLUMN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}

export const mailAction = (email) => async (dispatch) => {
    try{
        dispatch({
            type: MAIL_REQUEST
        })

        const {data} = await axios.post(`api/mailing/`, {'email': email})

        dispatch({
            type: MAIL_SUCCESS,
            payload: data
        })
    }catch(error){
        dispatch({
            type: MAIL_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}

export const searchAction = (keyword='') => async (dispatch) => {
    try{
        dispatch({
            type: SEARCH_REQUEST
        })

        const {data} = await axios.get(`api/search/articles/?search=${keyword}`)

        dispatch({
            type: SEARCH_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: SEARCH_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}

export const searchTagAction = (tag='') => async (dispatch) => {
    try {
        dispatch({
            type: SEARCH_TAG_REQUEST
        })

        const {data} = await axios.get(`api/search/articles/tag/${tag}`)

        dispatch({
            type: SEARCH_TAG_SUCCESS,
            payload: data
        })
    } catch(error) {
        dispatch({
            type: SEARCH_TAG_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}

export const createCommentAction = (articleId, text, parentId, name) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CREATE_COMMENT_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post(`api/article/${articleId}/comment/create/`, {'text': text, "parent": parentId, 'username': name}, config)

        dispatch({
            type: CREATE_COMMENT_SUCCESS,
            payload: data,
        })
    }catch(error) {
        dispatch({
            type: CREATE_COMMENT_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const CreateArticleAction = (article) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CREATE_ARTICLE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'multipart/form-data',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post(`api/article/create/`, article, config)

        dispatch({
            type: CREATE_ARTICLE_SUCCESS,
            payload: data,
        })
    }catch(error) {
        dispatch({
            type: CREATE_ARTICLE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const GetTagsAction = () => async (dispatch) => {
    try{
        dispatch({
            type: GET_TAGS_REQUEST
        })

        const {data} = await axios.get(`api/tags/`)

        dispatch({
            type: GET_TAGS_SUCCESS,
            payload: data
        })
    }catch(error){
        dispatch({
            type: GET_TAGS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}