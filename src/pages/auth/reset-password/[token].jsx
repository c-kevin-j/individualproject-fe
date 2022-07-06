import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { API_URL } from "../../../../helper";
import CardResetPass from "../../../Components/Login/ResetPass";

const ResetPasswordPage = () => {
  const router = useRouter();
  const { token } = router.query;
  const [isLoading, setIsLoading] = React.useState(true);
  const [tokenExist, setTokenExist] = React.useState(true);

  const checkToken = async () => {
    try {
      let resCheck = await axios.patch(`${API_URL}/users/token/check`,{
        type:"forgot-password"
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (resCheck.data.success) {
        setIsLoading(false);
        setTokenExist(true);
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

  return (
    <>
      {isLoading ? null : tokenExist ? (
        <CardResetPass token={token} />
      ) : (
        <div className="pt-12 text-center">
          <div className="font-bold text-xl">Page Not Found</div>
          <div className="underline cursor-pointer text-blue" onClick={()=>{router.push("/auth/login")}}>Back to login page</div>
        </div>
      )}
    </>
  );
};

export default ResetPasswordPage;
