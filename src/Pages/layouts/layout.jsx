import React from "react";
import Navbar from "../../Components/Navbar";

function Layout1 ({children, ...pageProps}) {
  return <div className="layout1">
    <Navbar />
    <div className="container pt-5  px-5">
      {children}
    </div>  
  </div>
}

export default Layout1