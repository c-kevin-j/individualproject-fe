import Navbar from "../Components/Navbar";

function Layout1({ children }) {
  return (
    <div className="layout1">
      <div className="fixed top-0 left-0 right-0 z-10 ">
        <Navbar />
      </div>
      <>
        <div className="relative top-20 mb-5">{children}</div>
      </>
    </div>
  );
}

export default Layout1;
