import React from "react";
import { Card, Button, Input } from "react-daisyui";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Axios from "axios";
import { API_URL } from "../../helper";
import Link from "next/link";
import UpdatePasswordContainer from "../Components/login/UpdatePasswordContainer";
import { useRouter } from "next/router";

function registerPage(props) {
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [valid, setValid] = React.useState(false);
  const [showPass, setShowPass] = React.useState(false);
  const [showConfPass, setShowConfPass] = React.useState(false);

  const router = useRouter();

  const handleRegister = async () => {
    try {
      if (
        username === "" ||
        email === "" ||
        pass === ""
      ) {
        alert("Fill in all form");
      } else {
        if (valid === false) {
          alert("Password not match");
        } else if (email.includes("@")) {
          
          // ////// axios json server
          // await Axios.post(`${API_URL}/users`, {
            //   username,
            //   email,
            //   password: pass,
            //   first_name: "",
            //   last_name: "",
            //   profile_picture:
            //     "https://i.pinimg.com/originals/a6/f3/c5/a6f3c55ace829310723adcb7a468869b.png",
            //   bio: "",
            //   verified_status: false,
            //   created_at: "",
            //   update_at: "",
            // });
            
            /////// axios backend
            await Axios.post(`${API_URL}/users/register`, {
              username,
              email,
              password: pass,
              //   profile_picture:
              //     "https://i.pinimg.com/originals/a6/f3/c5/a6f3c55ace829310723adcb7a468869b.png",
              //   verified_status: false,
            });
            alert("Registration success");

            router.push("/login");
        } else {
          alert("Email wrong");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
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
            <div class="card w-96 bg-base-100 shadow-xl">
              <div class="card-body">
                <h2 class="card-title">Register</h2>
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
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Username</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="Input Username..."
                    className="input input-bordered w-full"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                {/* <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <label className="input-group">
                    <Input
                      type={showPass ? "text" : "password"}
                      placeholder="Input password..."
                      className="input input-bordered w-full"
                      onChange={(e) => setPass(e.target.value)}
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
                </div>{" "} */}
                <UpdatePasswordContainer
                  handlePassword={handlePassword}
                  showPass={showPass}
                  toggleShowPass={()=>setShowPass(!showPass)}
                  showConfPass={showConfPass}
                  toggleShowConfPass={()=>setShowConfPass(!showConfPass)}
                ></UpdatePasswordContainer>
                
                <div>
                 
                </div>
                {/* <div className="form-control">
                  <label className="label">
                    <span className="label-text">Confirm Password</span>
                  </label>
                  <label className="input-group">
                    <Input
                      type={showConfirmedPass ? "text" : "password"}
                      placeholder="Confirm password..."
                      className="input input-bordered w-full"
                      onChange={(e) => setConfirmedPass(e.target.value)}
                    />
                    <button
                      className="btn btn-active btn-ghost text-white"
                      onClick={() => setShowConfirmedPass(!showConfirmedPass)}
                    >
                      {showConfirmedPass ? (
                        <AiFillEyeInvisible className="text-white" />
                      ) : (
                        <AiFillEye className="text-white" />
                      )}
                    </button>
                  </label>
                </div> */}
                <div class="card-actions justify-end mt-6">
                  <Link href="/login" passHref>
                    <Button>Cancel</Button>
                  </Link>
                  <Button onClick={handleRegister} color="primary">
                    Accept
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

export default registerPage;