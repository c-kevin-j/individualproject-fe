// import { GET_USERS, USERS_ERROR } from "../types"

const initialState = {
    user:{
        id: null,
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        profile_picture: "",
        bio: "",
        verified_status: null,
        created_at: "",
        updated_at: ""
    }
}

export default function usersReducer (state = initialState, action){

    switch(action.type){

        case "LOGIN_SUCCESS":
            console.log("DAPAT DATA DARI ACTION", action.payload)
        return { ...state, ...action.payload };
        case "LOGOUT":
            return initialState;
        case "EDIT_PROFILE":
            console.log("form edit",action.payload)
            return { ...state, ...action.payload }
        default: return state
    }

}