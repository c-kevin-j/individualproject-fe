import axios from "axios";
import React, {useState} from "react";
import { useSelector } from "react-redux";
import { API_URL } from "../../../helper";

const verifyAccountPage = () => {

  const { user } = useSelector((state)=>{
      return{
        user: state.usersReducer.user
      }
    })

  const handleVerify = async () => {
    try{
      console.log(user)
      let res = await axios.patch(`${API_URL}/users/${user.id}`,{
      verified_status:true
      })
      if (res) {
        alert("berhasil verifikasi")
      }
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="px-10 md:px-32 lg:px-48 xl:px-80 pt-5">
        Akun anda belum diverifikasi
        <div>
          <button type="button" className="btn" onClick={handleVerify}>verifikasi</button>
        </div>
      </div>
    </>
  );
};

verifyAccountPage.layout = "L1";

export default verifyAccountPage;
