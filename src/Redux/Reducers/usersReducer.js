// import { GET_USERS, USERS_ERROR } from "../types"

const initialState = {
    // password hanya untuk di json server
    user:{
        id: null,
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        // password: "",
        profile_picture: "",
        bio: "",
        token: "",
        verified_status: null,
    }
}

export default function usersReducer (state = initialState, action){

    switch(action.type){

        case "LOGIN_SUCCESS":
            console.log("DAPAT DATA DARI ACTION", action.payload)
            // console.log({ ...state, ...action.payload })
        return { user:{...state, ...action.payload} };
        case "LOGOUT":
            return initialState;
        case "EDIT_PROFILE":
            console.log("form edit",action.payload)
            return { ...state, ...action.payload }
        default: return state
    }

}