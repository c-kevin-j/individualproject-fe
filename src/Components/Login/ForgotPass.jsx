import React from "react";
import { Button, Input } from "react-daisyui";
import Axios from "axios";
import { API_URL } from "../../../helper";
import Link from "next/link";
import { useRouter } from "next/router";
import { route } from "next/dist/server/router";

export default function CardForgotPass(props) {
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [confirmedPass, setConfirmedPass] = React.useState("");
  const router = useRouter();

  const handleForgotPassword = async () => {
    try {
      let res = await Axios.patch(`${API_URL}/users/forgot`, {email});
      if (res.data.success){
        router.push("/auth/login")
        alert(res.data.message)
      } else {
        alert(res.data.message)
      }
      

      // if (res.data.length>0){
      //   alert("Email konfirmasi telah terkirim ke alamat email Anda")
      //   route.push("/auth/login")
      // } else {
      //   alert("Email tidak terdaftar")
      // }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <>
      <div className="md:container md:mx-auto">
        <div className="grid justify-items-center mt-8">
          <div className="grid content-start mt-8">
            <div class="card w-96 bg-base-100 shadow-xl">
              <div class="card-body">
                <h2 class="card-title">Forgot Password</h2>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="Input Email..."
                    className="input input-bordered w-full"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div class="card-actions justify-end mt-6">
                  <Link href="/auth/login" passHref>
                    <Button>Cancel</Button>
                  </Link>
                  <Button onClick={handleForgotPassword} color="primary">
                    Submit 
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}