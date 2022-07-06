import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { API_URL } from "../../../../helper";
import ModalAlert from "../../../Components/ModalAlert";
import { loginAction } from "../../../Redux/Actions/userAction.js";

const VerifyAccountPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // modal alert visiblity
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tokenExist, setTokenExist] = React.useState(true);
  const [modalContent, setModalContent] = useState({
    icon: "",
    title: "",
    text: "",
    onClick: null,
  });
  const toggleVisible = () => {
    setVisible(!visible);
  };

  const { token } = router.query;
  const { user } = useSelector((state) => {
    return {
      user: state.usersReducer.user,
    };
  });

  // verified user cannot acces this page
  const checkVerifiedStatus = () => {
    if (user.verified_status === 0 || !user) {
      router.push("/");
    }
  };
  React.useEffect(() => {
    checkVerifiedStatus();
  }, [user]);

  // check token validity
  const checkToken = async () => {
    try {
      let resCheck = await axios.patch(
        `${API_URL}/users/token/check`,
        {
          type: "verification",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (resCheck.data.success) {
        setIsLoading(false);
        setTokenExist(true);
        handleVerify();
      } else {
        setIsLoading(false);
        setTokenExist(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setTokenExist(false);
    }
  };

  React.useEffect(() => {
    checkToken();
  }, [token]);

  const handleVerify = async () => {
    try {
      let res = await axios.patch(
        `${API_URL}/users/verify`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res) {
        // menyimpan ulang data
        localStorage.setItem("tokenIdUser", res.data.token);
        dispatch(loginAction(res.data.user));
        setModalContent({
          icon: "success",
          title: "Success!",
          text: "Your account has been verified",
          onClick: () => router.push("/auth/login"),
        });

        toggleVisible();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //to resend verification token
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleReverify = async () => {
    let tokenUser = localStorage.getItem("tokenIdUser");
    try {
      setIsSubmitting(true);
      let res = await axios.get(`${API_URL}/users/verify/send`, {
        headers: {
          Authorization: `Bearer ${tokenUser}`,
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
    <div className="px-10 md:px-32 lg:px-48 xl:px-80 pt-5 text-center space-y-4">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <FaSpinner className="icon-spin" size={70} />
        </div>
      ) : !isLoading && tokenExist ? (
        <>
          <div className="flex justify-center">
            <FaSpinner className="icon-spin" size={56} />
          </div>
          <div>Verifying Your Account...</div>
        </>
      ) : !isLoading && !tokenExist ? (
        <div className="font-bold text-xl pt-8 text-center">
          Your Token is Invalid or Has Expired
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
        </div>
      ) : null}
      <ModalAlert
        visible={visible}
        toggleVisible={() => toggleVisible()}
        icon={modalContent.icon}
        title={modalContent.title}
        text={modalContent.text}
        onClick={modalContent.onClick}
      />
    </div>
  );
};

VerifyAccountPage.layout = "L1";

export default VerifyAccountPage;
