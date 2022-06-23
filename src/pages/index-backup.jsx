import Head from "next/head";
import Image from "next/image";
import MyApp from "./_app.js";
import Link from "next/link";
import { useRouter } from "next/router";
import React, {useState} from "react";
// import { Card, Button, Avatar } from "react-daisyui";
import ModalForgotPass from "../Components/Login/ForgotPass";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Axios from "axios";
import { API_URL } from "../../helper.js";
import { useDispatch } from "react-redux";
import { loginAction } from "../Redux/Actions/userAction.js";

// import styles from '../styles/Home.module.css'

function LandingPage({ href }) {
  //Visible state to open modal Register, and visiblePass to open modal Forgot Password
  const [visible, setVisible] = useState(false);
  const [visiblePass, setVisiblePass] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [inputForm, setInputForm] = useState({
    emailUsername: "",
    password: "",
  });
  const router = useRouter();
  const dispatch = useDispatch();

  const handleInput = (value, property) => {
    setInputForm({ ...inputForm, [property]: value });
  };

  const toggleVisible = (component) => {
    if (component === "pass") {
      setVisiblePass(!visiblePass);
    } else {
      setVisible(!visible);
    }
  };

  const handleLogin = async () => {
    try {
      let queryBy = "";
      if (inputForm.emailUsername.includes("@")) {
        queryBy = "email";
      } else {
        queryBy = "username";
      }
      let res = await Axios.get(
        `${API_URL}/users?${queryBy}=${inputForm.emailUsername}`
      );
      if (res.data.length > 0) {
        if (inputForm.password === res.data[0].password) {
          localStorage.setItem("tokenIdUser", res.data[0].id);
          let data = { user: res.data[0] };
          dispatch(loginAction(data));
          router.push("/");
        } else {
          alert("Password salah");
        }
      } else {
        alert("Email/Username tidak terdaftar");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="md:container md:mx-auto">
      <div className="grid justify-items-center mt-8">
        <div className="grid content-start mt-8">
          <article className="prose">
            <h1>Welcome, you right there!</h1>
            <br></br>
          </article>
        </div>
        <div className="card md:card-side bg-base-100 shadow-xl bg-base-200">
          <figure>
            <img
              src="https://api.lorem.space/image/album?w=400&h=400"
              alt="Album"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Sign in</h2>
            {/* <p>Sign up or die</p> */}
            <div className="form-control w-full max-w-md">
              <label className="label">
                <span className="label-text">Email/Username</span>
              </label>
              <input
                type="text"
                placeholder="Insert Email/Username..."
                className="input input-bordered w-full max-w-xs"
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
                  className="input input-bordered w-full max-w-xs"
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
                <Link href="/forgot" passHref>
                  <a className="link link-accent">Forgot password?</a>
                </Link>
                <br></br>
                <Link href="/auth/register" passHref>
                  <a className="link link-secondary">Register</a>
                </Link>
              </div>
              <div className="mt-4">
                <div className="card-actions justify-end">
                  <button className="btn btn-primary" onClick={handleLogin}>
                    Login
                  </button>
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
    </div>
  );
}

export default LandingPage;
