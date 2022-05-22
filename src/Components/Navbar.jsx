import Link from "next/link";
import React from "react";
import AddButton from "./Atoms/AddButton";
import ModalCreatePost from "./ModalCreatePost";
import Image from "next/image"
import axios from "axios"
import { API_URL } from '../../helper'
import { useDispatch,useSelector } from 'react-redux'
import { loginAction } from "../Redux/Actions/userAction";

function Navbar(props) {
  const [visible, setVisible] = React.useState(false)
  const handleLogout = () => {
    localStorage.removeItem("tokenIdUser")
  }
  const [profilePicture, setProfilePicture] = React.useState("")

  const dispatch = useDispatch()

  const { user } = useSelector((state)=>{
    return{
      user: state.usersReducer.user
    }
  })

  React.useEffect(() => {
    keepLogin();
  }, [])
  
  const keepLogin = () => {
    let token = localStorage.getItem("tokenIdUser")
    if (token) {
      axios.get(`${API_URL}/users?id=${token}`)
      .then((res)=>{
        localStorage.setItem("tokenIdUser", res.data[0].id)
        let data = {user:res.data[0]}
        dispatch(loginAction(data))
      }).catch((error)=>{
        console.log(error)
      })
    }
  }

  return (
    <div className="px-10 bg-base-300">
      <div className="navbar">
        <div className="flex-1">
          <Link href="/home">
            <div className="btn btn-ghost">
              <Image src={require("../../assets/logo.png")} width="40px" height="40px"  alt="logo" />
              <a className="normal-case text-xl">Boo</a>
            </div>

          </Link>
        </div>
        <div className="flex-none gap-2">
          {/* <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered"
            />
          </div> */}
          {/* <Link href="/post/create"> */}
            <div onClick={()=>setVisible(!visible)}>
              <AddButton />
              <ModalCreatePost 
                visible = {visible}
                toggleVisible = {()=>setVisible(!visible)}
              />
            </div>
          {/* </Link> */}
          <div className="dropdown dropdown-end">
            <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user.profile_picture} />
              </div>
            </label>
            <ul
              tabIndex="0"
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-300 rounded-box w-52"
            >
              <Link href={`/profile?id=${user.id}`}>
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
              </Link>
              <Link href="/profile/settings">
                <li>
                  <a>Setting</a>
                </li>
              </Link>
              <Link href="/">
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar