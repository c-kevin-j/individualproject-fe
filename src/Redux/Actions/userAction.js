

export const loginAction = (data) => {
    return {
      type: "LOGIN_SUCCESS",
      payload: data
    }
  }
  
export const logoutAction = () => {
    localStorage.removeItem("tokenIdUser")
    return {
      type: "LOGOUT"
    }
  }

export const editUser = (data) => {
    return {
      type: "EDIT_PROFILE",
      payload: data
    }
  }