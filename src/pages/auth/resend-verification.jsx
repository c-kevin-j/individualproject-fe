import axios from "axios";
import React, { useState } from "react";
import { API_URL } from "../../../helper";

const VerifyAccountPage = () => {
  const handleReverify = async () => {
    let token = localStorage.getItem("tokenIdUser");
    try {
      let res = await axios.get(`${API_URL}/users/verify/send`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="px-10 md:px-32 lg:px-48 xl:px-80 pt-5 text-center space-y-6">
        <div>Your account is not verified</div>
        <div>
          <button type="button" className="btn btn-secondary" onClick={handleReverify}>
            Re-send Verification
          </button>
        </div>
      </div>
    </>
  );
};

VerifyAccountPage.layout = "L1";

export default VerifyAccountPage;
