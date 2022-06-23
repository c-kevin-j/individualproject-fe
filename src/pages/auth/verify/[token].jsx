import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { API_URL } from "../../../../helper";

const verifyAccountPage = () => {

  const router = useRouter();
  const { token }=router.query;
  const { user } = useSelector((state)=>{
      return{
        user: state.usersReducer.user
      }
    })

  const handleVerify = async () => {
    try{
      console.log(user)
      let res = await axios.patch(`${API_URL}/users/verify`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // menyimpan ulang data
      localStorage.setItem("tokenIdUser", res.data.token);
      if (res) {
        alert("berhasil verifikasi")
        router.push("/")
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
