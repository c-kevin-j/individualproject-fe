import Head from "next/head";
import Image from "next/image";
import MyApp from "./_app.js";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
// import { Card, Button, Avatar } from "react-daisyui";
import ModalRegister from "../Components/Login/ModalRegister.jsx";
import ModalForgotPass from "../Components/Login/ModalForgotPass";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Axios from "axios";
import { API_URL } from "../../helper.js";

// import styles from '../styles/Home.module.css'

function LandingPage({ href }) {
  //Visible state to open modal Register, and visiblePass to open modal Forgot Password 
  const [visible, setVisible] = React.useState(false);
  const [visiblePass, setVisiblePass] = React.useState(false);
  const [showPass, setShowPass] = React.useState(false);
  const [inputForm, setInputForm] = React.useState({
    emailUsername: '',
    password: '',
  });
  const router = useRouter()

  const handleInput = (value, property) => {
    setInputForm({...inputForm,[property]: value})
  }

  const toggleVisible = (component) => {
    if (component === "pass") {
      setVisiblePass(!visiblePass);
    } else {
      setVisible(!visible);
    }
  };

  const handleLogin = async () => {
    try{
      let queryBy =""
      if(inputForm.emailUsername.includes("@")){
        queryBy = "email"
      } else {
        queryBy = "username"
      } 
      let res = await Axios.get(`${API_URL}/users?${queryBy}=${inputForm.emailUsername}`)
      if (res.data.length>0) {
        if (inputForm.password === res.data[0].password){
          localStorage.setItem("tokenIdUser", res.data[0].id)
          router.push('/home')
        } else {
          alert("Password salah")
        }
      } else {
        alert("Email/Username tidak terdaftar")
      }
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <div className="md:container md:mx-auto">
      <div className="grid justify-items-center mt-8">
        <div className="grid content-start mt-8">
          <article className="prose">
            <h1>Welcome, you right there!</h1>
            <br></br>
          </article>
        </div>
        <div className="card md:card-side bg-base-100 shadow-xl">
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
                onChange={(e)=> handleInput(e.target.value,"emailUsername")}
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <label class="input-group">
                <input
                  type={showPass?"text":"password"}
                  placeholder="Insert Password..."
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e)=> handleInput(e.target.value,"password")}
                />
                <button className="btn btn-active btn-ghost text-white" onClick={()=>setShowPass(!showPass)}>
                {showPass
                ?
                <AiFillEyeInvisible className="text-white"/>
                :
                <AiFillEye className="text-white" />
                }
            </button>
              </label>
            </div>
            <div className="grid grid-cols-2 place-items-stretch">
              <div className="mt-4">
                <a
                  className="link link-accent"
                  onClick={() => toggleVisible("pass")}
                >
                  Forgot password?
                </a>
                <ModalForgotPass
                  visible={visiblePass}
                  toggleVisible={() => toggleVisible("pass")}
                ></ModalForgotPass>
                <br></br>
                <a
                  className="link link-secondary"
                  onClick={() => toggleVisible("")}
                >
                  {" "}
                  Register{" "}
                </a>
                <ModalRegister
                  visible={visible}
                  toggleVisible={() => toggleVisible("")}
                ></ModalRegister>
              </div>
              <div className="mt-4">
                <div className="card-actions justify-end">
                  {/* <Link href="/home" passHref> */}
                    <button 
                      className="btn btn-primary"
                      onClick={handleLogin}
                    >
                      Login
                    </button>
                  {/* </Link> */}
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