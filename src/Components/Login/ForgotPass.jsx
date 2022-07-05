import React, { useState } from "react";
import { Button, Input } from "react-daisyui";
import Axios from "axios";
import { API_URL } from "../../../helper";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaSpinner } from "react-icons/fa";
import ModalAlert from "../ModalAlert";

export default function CardForgotPass(props) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  // modal alert visiblity
  const [visible, setVisible] = useState(false);
  const [modalContent, setModalContent] = useState({
    icon:"",
    title:"",
    text:"",
    onClick:null
  })

  const toggleVisible = () => {
    setVisible(!visible);
  };

  const handleForgotPassword = async () => {
    try {
      setIsSubmitting(true);
      let res = await Axios.patch(`${API_URL}/users/forgot`, { email });
      if (res.data.success) {
        setIsSubmitting(false);
        setModalContent({
          icon:"success",
          title:res.data.message,
          text:"Please check your email to reset your password",
          onClick:()=>router.push("/auth/login")
        })
        toggleVisible();
        // router.push("/auth/login");
      } else {
        setIsSubmitting(false);
        setModalContent({
          icon:"error",
          title:"ERROR!",
          text:res.data.message
        })
        toggleVisible();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="md:container md:mx-auto">
        <div className="grid justify-items-center mt-8">
          <div className="grid content-start mt-8">
            <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Forgot Password</h2>
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
                <div className="card-actions justify-end mt-6">
                  <Link href="/auth/login" passHref>
                    <Button>Cancel</Button>
                  </Link>
                  <Button
                    onClick={handleForgotPassword}
                    className="w-24 btn-secondary"
                    disabled={!email || isSubmitting}
                  >
                    {!isSubmitting ? (
                      "Submit"
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
