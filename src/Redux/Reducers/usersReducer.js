// import { GET_USERS, USERS_ERROR } from "../types"

const initialState = {
    users:[],
    loading:true
}

export default function usersReducer (state = initialState, action){

    switch(action.type){

        case "GET_USERS":
        return {
            ...state,
            users:action.payload,
            loading:false
        }
        case "USERS_ERROR":
            return{
                loading: false, 
                error: action.payload 
            }
        case "ADD_USER":
        console.log("DAPAT DARI ACTION",action.payload)
        return {
            ...state,
            users:action.payload
        }
        default: return state
    }

}