
// import {GET_USERS, USERS_ERROR} from '../types'
import { API_URL } from '../../../helper'
import Axios from 'axios'

export const getUsers = () => async dispatch => {
    
    try{
        const res = await Axios.get(`${API_URL}/users`)
        dispatch( {
            type: "GET_USERS",
            payload: res.data
        })
    }
    catch(error){
        dispatch( {
            type: "USERS_ERROR",
            payload: error,
        })
    }

}

export const saveUserAction = (data) => {
  console.log("DATA DARI COMPONENT UI",data)
  return {
    type: "ADD_USER",
    payload: data
  }
}