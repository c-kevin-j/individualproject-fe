import Navbar from "../../Components/Navbar";

function Layout1 ({children}) {
  return <div className="layout1">
    <Navbar />
    <div>
      {children}
    </div>  
  </div>
}

export default Layout1