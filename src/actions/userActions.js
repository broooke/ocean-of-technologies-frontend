import axios from 'axios'
import { 
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,

    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_SUPPORT_FAIL,
    USER_SUPPORT_REQUEST,
    USER_SUPPORT_SUCCESS,
 } from '../constants/userConstants'

 export const login = (username, password) => async (dispatch) => {
     try{
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers:{
                'Content-type':'application/json'
            }
        }

        const {data} = await axios.post('/api/users/login/', {'username': username, 'password': password}, config)

        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
     }catch(error){
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
     }
 }


 export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({type: USER_LOGOUT})
 }


 export const register = (username, email, password) => async (dispatch) => {
    try{
       dispatch({
           type: USER_REGISTER_REQUEST
       })

       const config = {
           headers:{
               'Content-type':'application/json'
           }
       }

       const {data} = await axios.post('/api/users/register/', {'username': username, 'email':email, 'password': password}, config)

       dispatch({
           type:USER_REGISTER_SUCCESS,
           payload:data
       })

       dispatch({
        type:USER_LOGIN_SUCCESS,
        payload:data
    })

       localStorage.setItem('userInfo', JSON.stringify(data))
    }catch(error){
       dispatch({
           type: USER_REGISTER_FAIL,
           payload: error.response && error.response.data.detail
               ? error.response.data.detail
               : error.message
       })
    }
}

export const updateUser = (user) => async (dispatch, getState) => {
    try{
        dispatch({
            type: USER_UPDATE_REQUEST
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

        const {data} = await axios.put(`api/users/update/`, user, config)

        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: data,
        })

        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data,
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    }catch(error){
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
               ? error.response.data.detail
               : error.message
        })
    }
}

export const supportUserAction = (support) => async (dispatch) => {
    try {
        dispatch({type:USER_SUPPORT_REQUEST})

        const {data} = await axios.post(`api/support/`, support)

        dispatch({
            type: USER_SUPPORT_SUCCESS,
            payload: data,
        })
    }catch(error){
        dispatch({
            type: USER_SUPPORT_FAIL,
            payload: error.response && error.response.data.detail
               ? error.response.data.detail
               : error.message
        })
    }
}