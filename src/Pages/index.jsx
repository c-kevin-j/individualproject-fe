import Head from "next/head";
import Image from "next/image";
import MyApp from "./_app.js";
import Link from "next/link";
import React from "react";
// import { Card, Button, Avatar } from "react-daisyui";
import ModalRegister from "../Components/Login/ModalRegister.jsx";
import ModalForgotPass from "../Components/Login/ModalForgotPass";
// import styles from '../styles/Home.module.css'

function LandingPage({ href }) {
  const [visible, setVisible] = React.useState(false);
  const [visiblePass, setVisiblePass] = React.useState(false);

  const toggleVisible = (component) => {
    if (component === "pass") {
      setVisiblePass(!visiblePass);
    } else {
      setVisible(!visible);
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
        <div className="card md:card-side bg-base-100 shadow-xl">
          <figure>
            <img
              src="https://api.lorem.space/image/album?w=400&h=400"
              alt="Album"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Sign in or die</h2>
            <p>Sign up or die</p>
            <div className="form-control w-full max-w-md">
              <label className="label">
                <span className="label-text">Email/Username</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
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
                  <Link href="/home" passHref>
                    <button className="btn btn-primary">Login</button>
                  </Link>
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