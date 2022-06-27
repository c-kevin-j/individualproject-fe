import React, { useState } from "react";
import { Button, Input } from "react-daisyui";
import Axios from "axios";
import { API_URL } from "../../../helper";
import Link from "next/link";
import UpdatePasswordContainer from "../../Components/Login/UpdatePasswordContainer";
import { useRouter } from "next/router";
import { FaSpinner } from "react-icons/fa";
import ModalAlert from "../../Components/ModalAlert";

function RegisterPage(props) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [valid, setValid] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfPass, setShowConfPass] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  React.useEffect(() => {
    let token = localStorage.getItem("tokenIdUser");
    if (token) {
      router.push("/");
    }
  }, []);

  const handleRegister = async () => {
    try {
      setIsSubmitting(true);
      if (username === "" || email === "" || pass === "") {
        setModalContent({
          icon: "Error",
          title: "Error!",
          text: "Please fill in all form",
        });
        toggleVisible();
      } else {
        if (email.includes("@")) {
          /////// axios backend
          let res = await Axios.post(`${API_URL}/users/register`, {
            username,
            email,
            password: pass,
          });
          if (res.data.success) {
            setIsSubmitting(false);
            setModalContent({
              icon: "success",
              title: "Success!",
              text: "Your account is created, please check your email to verify your account",
              onClick: () => router.push("/auth/login"),
            });
            toggleVisible();
          } else {
            setIsSubmitting(false);
            setModalContent({
              icon: "error",
              title: "Error!",
              text: res.data.message,
            });
            toggleVisible();
          }
        } else {
          setIsSubmitting(false);
          setModalContent({
            icon: "error",
            title: "Error!",
            text: "Your email input is wrong",
          });
          toggleVisible();
        }
      }
    } catch (error) {
      setIsSubmitting(false);
      setModalContent({
        icon: "error",
        title: "Error!",
        text: "Please try again",
      });
      toggleVisible();
      console.log(error);
    }
  };
  const handlePassword = (childData) => {
    const password = childData["password"];
    const valid = childData["valid"];
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
                <h2 className="card-title">Register</h2>
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
                  toggleShowPass={() => setShowPass(!showPass)}
                  showConfPass={showConfPass}
                  toggleShowConfPass={() => setShowConfPass(!showConfPass)}
                ></UpdatePasswordContainer>

                <div></div>
                <div className="card-actions justify-end mt-6">
                  <Link href="/auth/login" passHref>
                    <Button>Cancel</Button>
                  </Link>
                  <Button
                    onClick={handleRegister}
                    color="primary"
                    disabled={
                      !email || !username || !pass || !valid || isSubmitting
                    }
                  >
                    {!isSubmitting ? (
                      "Register"
                    ) : (
                      <FaSpinner className="icon-spin" />
                    )}
                  </Button>
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
      </div>
    </>
  );
}

export default RegisterPage;
