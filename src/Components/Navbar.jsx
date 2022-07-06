import Link from "next/link";
import React, { useState } from "react";
import AddButton from "./Atoms/AddButton";
import ModalCreatePost from "./Posts/ModalCreatePost";
import Image from "next/image";
import axios from "axios";
import { API_URL } from "../../helper";
import { useDispatch, useSelector } from "react-redux";
import { loginAction, logoutAction } from "../Redux/Actions/userAction";
import { useRouter } from "next/router";

function Navbar(props) {
  const [visible, setVisible] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("tokenIdUser");
    dispatch(logoutAction());
  };

  const router = useRouter();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => {
    return {
      user: state.usersReducer.user,
    };
  });

  React.useEffect(() => {
    keepLogin();
    checkVerified();
  }, [router.pathname]);
  
  React.useEffect(()=>{
    keepLogin();
    checkVerified();
  },[])
  
  const keepLogin = async () => {
    let token = localStorage.getItem("tokenIdUser");
    if (token) {
      try {
        // backend
        let res = await axios.post(
          `${API_URL}/users/keepLogin`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              // "Access-Control-Allow-Origin": "*",
              // "Access-Control-Allow-Methods":
              //   "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            },
          }
        );
        // res.headers["access-control-allow-origin"];
        localStorage.setItem("tokenIdUser", res.data.token);
        // memperbarui reducer
        dispatch(loginAction(res.data));
        if (user.verified_status === 1) {
          router.push("/auth/resend-verification");
        }
      } catch (error) {
        console.log(error);
        localStorage.removeItem("tokenIdUser");
        router.push("/auth/login");
      }
    } else {
      router.push("/auth/login");
    }
  };

  // React.useEffect(() => {
  //   checkVerified();
  // }, [user]);

  const checkVerified = () => {
    if (user.verified_status === 1) {
      router.push("/auth/resend-verification");
    }
  };

  return (
    <div>
      <div className="px-10 md:px-32 lg:px-48 xl:px-80 bg-primary sticky top-0 left-0 right-0 z-10 border-b-4 border-double border-neutral-100">
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
                <a className="normal-case text-3xl font-bold">Kartoffel</a>
              </div>
            </Link>
          </div>
          <div className="flex-none gap-2">
            {user.verified_status === 0 && (
              <>
                <div onClick={() => setVisible(!visible)}>
                  <AddButton />
                </div>
                <ModalCreatePost
                  visible={visible}
                  toggleVisible={() => setVisible(!visible)}
                />
              </>
            )}
            <div className="dropdown dropdown-end">
              <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={`${API_URL}${user.profile_picture}`} />
                </div>
              </label>
              <ul
                tabIndex="0"
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-secondary rounded-box w-52"
              >
                {user.verified_status === 0 && (
                  <>
                    <Link href={`/profile?id=${user.id}`}>
                      <li>
                        <a className="justify-between">Profile</a>
                      </li>
                    </Link>
                    <Link href="/profile/settings">
                      <li>
                        <a>Setting</a>
                      </li>
                    </Link>
                  </>
                )}
                <Link href="/auth/login">
                  <li>
                    <a onClick={handleLogout}>Logout</a>
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
