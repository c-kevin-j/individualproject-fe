import React, {useState} from "react";
import { Button, Input } from "react-daisyui";
import Axios from "axios";
import { API_URL } from "../../../helper";
import Link from "next/link";
import { useRouter } from "next/router";
import { route } from "next/dist/server/router";
import UpdatePasswordContainer from "./UpdatePasswordContainer";

export default function CardResetPass(props) {
  const [pass, setPass] = useState("");
  const [valid, setValid] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfPass, setShowConfPass] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      console.log(pass)
      console.log(props.token)
      let res = await Axios.patch(`${API_URL}/users/reset/password`, {pass}, {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      })
      if (res.data.success) {
        alert(res.data.message)
        router.push("/auth/login")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handlePassword = (childData) => {
    const password = childData["password"];
    const valid = childData["valid"]
    setPass(password);
    setValid(valid);
  };

  return (
    <>
      <div className="md:container md:mx-auto">
        <div className="grid justify-items-center mt-8">
          <div className="grid content-start mt-8">
            <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Reset Password</h2>
                {/* <div className="form-control">
                  <label className="label">
                    <span className="label-text">New Password</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="Input Email..."
                    className="input input-bordered w-full"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div> */}
                <UpdatePasswordContainer
                  handlePassword={handlePassword}
                  showPass={showPass}
                  toggleShowPass={()=>setShowPass(!showPass)}
                  showConfPass={showConfPass}
                  toggleShowConfPass={()=>setShowConfPass(!showConfPass)}
                ></UpdatePasswordContainer>

                <div className="card-actions justify-end mt-6">
                  <Link href="/auth/login" passHref>
                    <Button>Cancel</Button>
                  </Link>
                  <Button onClick={handleSubmit} color="primary">
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