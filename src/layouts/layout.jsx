import Navbar from "../Components/Navbar";

function Layout1 ({children}) {
  return <div className="layout1">
    <Navbar />
    <>
      {children}
    </>  
  </div>
}

export default Layout1