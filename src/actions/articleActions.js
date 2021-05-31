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