import Head from "next/head";
import Image from "next/image";
import MyApp from "../pages/_app.js";
import Link from "next/link";
// import styles from '../styles/Home.module.css'

export default function LandingPage({ href }) {
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
        <figure><img src="https://api.lorem.space/image/album?w=400&h=400" alt="Album"/></figure>
          <div className="card-body">
            <h2 className="card-title">Sign in or die</h2>
            <p>Sign up or die</p>
            <div className="form-control w-full max-w-md">
              <label className="label">
                <span className="label-text">Email</span>
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
                <Link href="/forgot">
                  <a className="link link-accent">Forgot password?</a>
                </Link>
                <br></br>
                <Link href="/register">
                  <a className="link link-secondary">Register</a>
                </Link>
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
            <div className="flex flex-row-reverse">
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
