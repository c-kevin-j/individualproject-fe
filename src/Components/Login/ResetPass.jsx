import React, { useState } from "react";
import { Button, Input } from "react-daisyui";
import Axios from "axios";
import { API_URL } from "../../../helper";
import Link from "next/link";
import { useRouter } from "next/router";
import { route } from "next/dist/server/router";
import UpdatePasswordContainer from "./UpdatePasswordContainer";
import ModalAlert from "../ModalAlert";
import { FaSpinner } from "react-icons/fa";

export default function CardResetPass(props) {
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

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      let res = await Axios.patch(
        `${API_URL}/users/reset/password`,
        { pass },
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        }
      );
      if (res.data.success) {
        setIsSubmitting(false);
        setModalContent({
          icon: "success",
          title: "Success!",
          text: res.data.message,
          onClick: () => router.push("/auth/login"),
        });
        toggleVisible();
      }
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
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
            <div className="card w-96 bg-base-200 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Reset Password</h2>
                <UpdatePasswordContainer
                  handlePassword={handlePassword}
                  showPass={showPass}
                  toggleShowPass={() => setShowPass(!showPass)}
                  showConfPass={showConfPass}
                  toggleShowConfPass={() => setShowConfPass(!showConfPass)}
                ></UpdatePasswordContainer>

                <div className="card-actions justify-end mt-6">
                  <Link href="/auth/login" passHref>
                    <Button>Cancel</Button>
                  </Link>
                  <Button
                    onClick={handleSubmit}
                    className="btn-secondary w-24"
                    disabled={!valid}
                    disable={isSubmitting}
                  >
                    {!isSubmitting ? (
                      "Submit"
                    ) : (
                      <FaSpinner className="icon-spin" />
                    )}
                  </Button>
                </div>
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
    </>
  );
}
