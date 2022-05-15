import Link from "next/link";
import React from "react";
import AddButton from "./Atoms/AddButton";
import ModalCreatePost from "./ModalCreatePost";
import Image from "next/image"
import axios from "axios"
import { API_URL } from '../../helper'

// export const getServerSideProps = async (ctx) => {
//   try {
//     let token = localStorage.getItem("tokenIdUser")
//     console.log(token)
//     let res = await axios.get(`${API_URL}/users?id=1`)
//     console.log(res.data[0])
//     return {
//       props:{
//         profilePicture:res.data[0].profile_picture
//       }
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

function Navbar(props) {
  const [visible, setVisible] = React.useState(false)
  const handleLogout = () => {
    localStorage.removeItem("tokenIdUser")
  }
  const [profilePicture, setProfilePicture] = React.useState("")

  // React.useEffect = (()=>{
  //   getProfilePicture()
  // },[])

  const getProfilePicture = async () => {
    try{
      let token = localStorage.getItem("tokenIdUser")
      console.log(token)
      let res = await axios.get(`${API_URL}/users?id=1`)
      console.log(res.data[0])
    } catch(error){
      console.log(error)
    }
  }


  return (
    <div className="navbar bg-base-100">
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
              <img src={props.profilePicture} />
            </div>
          </label>
          <ul
            tabIndex="0"
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <Link href="/profile">
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
            </Link>
            <Link href="/profile/reset-password">
              <li>
                <a>Reset Password</a>
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
  );
}

export default Navbar