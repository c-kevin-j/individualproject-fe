import Navbar from "../Components/Navbar";

function Layout1 ({children}) {
  return <div className="layout1">
    <div className="sticky top-0 left-0 right-0 z-10 ">
    <Navbar />

    </div>
    <>
    <div className="overflow-y-auto max-h-screen h-fit">
      {children}
    </div>
    </>  
  </div>
}

export default Layout1