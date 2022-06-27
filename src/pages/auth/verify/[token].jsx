import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useSelector } from "react-redux";
import { API_URL } from "../../../../helper";
import ModalAlert from "../../../Components/ModalAlert";

const VerifyAccountPage = () => {
  const router = useRouter();

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

  const { token } = router.query;
  const { user } = useSelector((state) => {
    return {
      user: state.usersReducer.user,
    };
  });

  const handleVerify = async () => {
    try {
      console.log(user);
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

  React.useEffect(() => {
    handleVerify();
  }, [token]);

  return (
    <div className="px-10 md:px-32 lg:px-48 xl:px-80 pt-5 text-center space-y-4">
      <div className="flex justify-center">
        <FaSpinner className="icon-spin" size={56} />
      </div>
      <div>Verifying Your Account...</div>
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
