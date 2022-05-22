
// import {GET_USERS, USERS_ERROR} from '../types'
import { API_URL } from '../../../helper'
import Axios from 'axios'

// export const getUsers = () => async dispatch => {
    
//     try{
//         const res = await Axios.get(`${API_URL}/users`)
//         dispatch( {
//             type: "GET_USERS",
//             payload: res.data
//         })
//     }
//     catch(error){
//         dispatch( {
//             type: "USERS_ERROR",
//             payload: error,
//         })
//     }

// }

// export const saveUserAction = (data) => {
//   console.log("DATA DARI COMPONENT UI",data)
//   return {
//     type: "ADD_USER",
//     payload: data
//   }
// }

export const loginAction = (data) => {
    console.log("DATA DARI COMPONENT UI", data)
    return {
      type: "LOGIN_SUCCESS",
      payload: data
    }
  }
  
export const logoutAction = () => {
    // localStorage.removeItem("tokenIdUser")
    return {
      type: "LOGOUT"
    }
  }

export const editUser = (data) => {
    console.log("DATA DARI COMPONENT UI", data)
    return {
      type: "EDIT_PROFILE",
      payload: data
    }
  }