import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useSelector } from "react-redux";
import { API_URL } from "../../../../helper";
import Swal from 'sweetalert2'

const VerifyAccountPage = () => {
  const router = useRouter();
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
      // menyimpan ulang data
      localStorage.setItem("tokenIdUser", res.data.token);
      if (res) {
        Swal.fire({
          title: 'Success!',
          text: 'Your account has been verified',
          icon: 'success',
          confirmButtonText: 'Continue'
        })
        router.push("/");
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
      <div className="flex justify-center"><FaSpinner className="icon-spin" size={56}/></div>
      <div>Verifying Your Account...</div>
    </div>
  );
};

VerifyAccountPage.layout = "L1";

export default VerifyAccountPage;
