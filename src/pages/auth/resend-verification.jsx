import axios from "axios";
import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { API_URL } from "../../../helper";
import ModalAlert from "../../Components/ModalAlert";

const VerifyAccountPage = () => {
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

  const handleReverify = async () => {
    let token = localStorage.getItem("tokenIdUser");
    try {
      setIsSubmitting(true);
      let res = await axios.get(`${API_URL}/users/verify/send`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        setModalContent({
          icon: "Success",
          title: "Success!",
          text: res.data.message,
        });
        toggleVisible();
        setIsSubmitting(false);
      }
    } catch (error) {
      console.log(error);
      setModalContent({
        icon: "Error",
        title: "Error!",
        text: "Please try again",
      });
      toggleVisible();
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="px-10 md:px-32 lg:px-48 xl:px-80 pt-5 text-center space-y-6">
        <div>Your account is not verified</div>
        <div>
          <button
            type="button"
            className="btn btn-secondary w-48"
            onClick={handleReverify}
            disabled={isSubmitting}
          >
            {!isSubmitting ? (
              "Re-send Verification"
            ) : (
              <>
                <FaSpinner className="icon-spin" />
              </>
            )}
          </button>
        </div>
        <ModalAlert
          visible={visible}
          toggleVisible={() => toggleVisible()}
          icon={modalContent.icon}
          title={modalContent.title}
          text={modalContent.text}
        />
      </div>
    </>
  );
};

VerifyAccountPage.layout = "L1";

export default VerifyAccountPage;
