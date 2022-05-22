import React from "react";

const EditProfilePage = (props) => {
  const [selectedTab, setSelectedTab] = React.useState(1)

  const selectTab = (tab) => {
    setSelectedTab(tab)
  }

  const printSettings = () => {
    if(selectedTab===1){
      return <div className="">
        <span className="inline">First Name</span>
        <input
          type="text"
          placeholder="Input First Name..."
          className="inline input input-bordered w-full"
        />
      </div>  
    } else 
    // Change Password
    if(selectedTab===2){
      return <div>
        Change Password
      </div>
    }
  }

  return(
    <div className="grid grid-cols-6 gap 4">
      <div className="justify-center col-start-2 col-span-4 tabs">
        <a className={`tab tab-bordered ${selectedTab===1&&"tab-active"}`} onClick={()=>selectTab(1)}>Edit Profile</a>
        <a className={`tab tab-bordered ${selectedTab===2&&"tab-active"}`} onClick={()=>selectTab(2)}>Change Password</a>
      </div>
      <div className="col-start-2 col-span-4 pt-3">
        <div className="form-control">
          {printSettings()}
        </div>
      </div>
    </div>
  )
}

EditProfilePage.layout = "L1";

export default EditProfilePage