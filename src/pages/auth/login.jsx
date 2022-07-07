import Head from "next/head";
import Image from "next/image";
import MyApp from "../_app.js";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Axios from "axios";
import { API_URL } from "../../../helper.js";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../Redux/Actions/userAction.js";
import ModalAlert from "../../Components/ModalAlert.jsx";
import { FaSpinner } from "react-icons/fa";

function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [inputForm, setInputForm] = useState({
    emailUsername: "",
    password: "",
  });
  const router = useRouter();
  const dispatch = useDispatch();

  // modal alert visiblity
  const [visible, setVisible] = useState(false);
  const [modalContent, setModalContent] = useState({
    icon: "",
    title: "",
    text: "",
    onClick: null,
  });
  const toggleVisible = () => {
    setVisible(!visible);
  };

  const handleInput = (value, property) => {
    setInputForm({ ...inputForm, [property]: value });
  };

  const { user } = useSelector((state) => {
    return {
      user: state.usersReducer.user,
    };
  });

  const checkUserLoggedIn = async () => {
    let token = localStorage.getItem("tokenIdUser");
    if (token) {
      try {
        // backend
        let res = await Axios.post(
          `${API_URL}/users/keepLogin`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(res);
        // res.headers["access-control-allow-origin"];
        localStorage.setItem("tokenIdUser", res.data.token);
        // memperbarui reducer
        dispatch(loginAction(res.data));
        if (user.verified_status === 1) {
          router.push("/auth/resend-verification");
        } else {
          router.push("/");
        }
      } catch (error) {
        console.log(error);
        localStorage.removeItem("tokenIdUser");
        setIsLoading(false);
        // router.push("/auth/login");
      }
    } else {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const handleLogin = async () => {
    try {
      let queryBy = "";
      if (inputForm.emailUsername.includes("@")) {
        queryBy = "email";
      } else {
        queryBy = "username";
      }

      ///////////// backend sql
      const reqLogin = {
        loginBy: queryBy,
        loginByValue: inputForm.emailUsername,
        password: inputForm.password,
      };
      let res = await Axios.post(`${API_URL}/users/login`, reqLogin);
      if (res.data.success) {
        localStorage.setItem("tokenIdUser", res.data.user.token);
        dispatch(loginAction(res.data.user));
        router.push("/");
      } else {
        setModalContent({
          icon: "error",
          title: "Error!",
          text: res.data.message,
        });
        toggleVisible();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="md:container md:mx-auto">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <FaSpinner className="icon-spin" size={70} />
        </div>
      ) : (
        <div className="grid justify-items-center mt-8">
          <div className="grid content-start mt-8">
            <article className="prose">
              <h1>Welcome, you right there!</h1>
              <br></br>
            </article>
          </div>
          <div className="card md:card-side bg-primary shadow-xl">
            <figure>
              <Image
                src={require("../../../assets/Doge.png")}
                width="400px"
                height="400px"
                alt="logo"
              />
            </figure>
            <div className="card-body ">
              <h2 className="card-title">Sign in</h2>
              {/* <p>Sign up or die</p> */}
              <div className="form-control w-full max-w-md">
                <label className="label">
                  <span className="label-text">Email/Username</span>
                </label>
                <input
                  type="text"
                  placeholder="Insert Email/Username..."
                  className="input input-bordered w-full max-w-xs bg-white"
                  onChange={(e) => handleInput(e.target.value, "emailUsername")}
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <label className="input-group">
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Insert Password..."
                    className="input input-bordered w-full max-w-xs bg-white"
                    onChange={(e) => handleInput(e.target.value, "password")}
                  />
                  <button
                    className="btn btn-active btn-ghost text-white"
                    onClick={() => setShowPass(!showPass)}
                  >
                    {showPass ? (
                      <AiFillEyeInvisible className="text-white" />
                    ) : (
                      <AiFillEye className="text-white" />
                    )}
                  </button>
                </label>
              </div>
              {/* Passwords should contain at least 8 characters including an
            uppercase letter, a symbol, and a number. Display proper error
            messages for cases such as weak password, used email or username,
            and other erros. */}
              <div className="grid grid-cols-2 place-items-stretch">
                <div className="mt-4">
                  <Link href="/auth/forgot" passHref>
                    <a className="link text-accent-focus">Forgot password?</a>
                  </Link>
                  <br></br>
                  <Link href="/auth/register" passHref>
                    <a className="link text-secondary-content">Register</a>
                  </Link>
                </div>
                <div className="mt-4">
                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-secondary"
                      onClick={handleLogin}
                      disabled={!inputForm.emailUsername || !inputForm.password}
                    >
                      Login
                    </button>
                    <ModalAlert
                      visible={visible}
                      toggleVisible={() => toggleVisible()}
                      icon={modalContent.icon}
                      title={modalContent.title}
                      text={modalContent.text}
                      onClick={modalContent.onClick}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid justify-items-center">
            <div className="grow order-2">
              <br></br>
              <div className="flex flex-row-reverse"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
