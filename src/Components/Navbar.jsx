import Link from "next/link";
import React from "react";
import AddButton from "./Atoms/AddButton";
import ModalCreatePost from "./Posts/ModalCreatePost";
import Image from "next/image";
import axios from "axios";
import { API_URL } from "../../helper";
import { useDispatch, useSelector } from "react-redux";
import { loginAction, logoutAction } from "../Redux/Actions/userAction";
import { useRouter } from "next/router";

function Navbar(props) {
  const [visible, setVisible] = React.useState(false);

  const handleLogout = () => {
    localStorage.removeItem("tokenIdUser");
    dispatch(logoutAction());
  };

  const [profilePicture, setProfilePicture] = React.useState("");

  const router = useRouter();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => {
    // console.log('selector',state.usersReducer.user)
    return {
      user: state.usersReducer.user,
    };
  });

  React.useEffect(() => {
    keepLogin();
  }, []);

  const keepLogin = async () => {
    let token = localStorage.getItem("tokenIdUser");
    if (token) {

      // //backend json server
      // await axios
      //   .get(`${API_URL}/users?id=${token}`)
      //   .then((res) => {
      //     localStorage.setItem("tokenIdUser", res.data[0].id);
      //     let data = { user: res.data[0] };
      //     dispatch(loginAction(data));
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });

      // backend
        let res = await axios.get(`${API_URL}/users/login/keep`, {
          headers:{
            'Authorization':`Bearer ${token}`
          }
        })
        localStorage.setItem("tokenIdUser", res.data.token);
        // memperbarui reducer
        // console.log('keeplogin',res.data)
        // console.log('user BEFORE DISPATCH',user)
        dispatch(loginAction(res.data));
        // console.log('user AFTER DISPATCH',user)

    } else {
      router.push('/login')
    }
  };

  return (
    <div className="px-10 md:px-32 lg:px-48 xl:px-80 bg-base-300 sticky top-0 left-0 right-0 z-10 border-b-4 border-double border-neutral-100">
      <div className="navbar">
        <div className="flex-1">
          <Link href="/">
            <div className="btn btn-ghost gap-2">
              <Image
                src={require("../../assets/logo.png")}
                width="40px"
                height="40px"
                alt="logo"
              />
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
          <div onClick={() => setVisible(!visible)}>
            <AddButton />
            <ModalCreatePost
              visible={visible}
              toggleVisible={() => setVisible(!visible)}
            />
          </div>
          {/* </Link> */}
          <div className="dropdown dropdown-end">
            <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                {/* avatar fake backend */}
                {/* <img src={user.profile_picture} /> */}
                
                {/* avatar backend */}
                <img src={`${API_URL}${user.profile_picture}`} />
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
                  </a>
                </li>
              </Link>
              <Link href="/profile/settings">
                <li>
                  <a>Setting</a>
                </li>
              </Link>
              <Link href="/login">
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

export default Navbar;
