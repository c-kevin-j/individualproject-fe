import React, { useState } from "react";
import { Button, Input } from "react-daisyui";
import Axios from "axios";
import { API_URL } from "../../../helper";
import Link from "next/link";
import UpdatePasswordContainer from "../../Components/Login/UpdatePasswordContainer";
import { useRouter } from "next/router";
import { FaSpinner } from "react-icons/fa";
import ModalAlert from "../../Components/ModalAlert";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../Redux/Actions/userAction";

function RegisterPage(props) {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [valid, setValid] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfPass, setShowConfPass] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
        router.push("/auth/login");
      }
    } else {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    checkUserLoggedIn();
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
            // localStorage.setItem("tokenIdUser", res.data.user.token);
            // dispatch(loginAction(res.data.user));
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
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <FaSpinner className="icon-spin" size={70} />
          </div>
        ) : (
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
                      className="input input-bordered w-full bg-white"
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
                      className="input input-bordered w-full bg-white"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
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
                      className="w-24 btn-secondary"
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
        )}
      </div>
    </>
  );
}

export default RegisterPage;
