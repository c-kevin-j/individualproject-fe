// import React from "react";
import React from "react";
import { Textarea, Input, Avatar } from "react-daisyui";
import EditButton from "../../Components/Atoms/EditButton";
import SaveButton from "../../Components/Atoms/SaveButton";
import CancelButton from "../../Components/Atoms/CancelButton";
import { useState } from "react";

function ProfilePage(props) {
  const [profile, setProfile] = useState({
    firstName:"",
    lastName:"",
    fullName:"",
    userName:"",
    email:"",
    bio:"",
    profilePicture:"https://api.lorem.space/image/face?hash=64318"
  })
  const [editIsOn, setEditIsOn] = useState(false);
  const filePickerRef = React.useRef(null);

  function editHandler() {
    setEditIsOn(!editIsOn);
  }

  const handleSave = (form) => {
    form.fullName=form.firstName+' '+form.lastName
    console.log(form)
    setProfile(form)
    setEditIsOn(!editIsOn);
  };

  const handleCancel = () => {
    setEditIsOn(!editIsOn);
  }

  const printProfile = () => {
    return <>
      <div className="align-bottom">
        <div className="grid grid-cols-3">
          <label className="label col-span-1">
            <span className="label-text">Full Name</span>
          </label>
          <div className="col-span-2">{profile.fullName}</div>
          <label className="label">
            <span className="label-text col-span-1">Username</span>
          </label>
          <div className="col-span-2">{profile.userName}</div>
          <label className="label">
            <span className="label-text col-span-1">Email</span>
          </label>
          <div className="col-span-2">{profile.email}</div>
          <label className="label col-span-1">
            <span className="label-text">Bio</span>
          </label>
          <div className="col-span-2">{profile.bio}</div>
        </div>
      </div>
      <EditButton clickEdit={editHandler}/>
      
    </>
  }

  const showEditProfile = () => {
    let formEditProfile = {
      firstName:profile.firstName,
      lastName:profile.lastName,
      fullName:profile.fullName,
      userName:profile.userName,
      email:profile.email,
      bio:profile.bio,
      profilePicture:profile.profilePicture
    }

    return <>
      <div className="grid grid-cols-3">
        <label className="label col-span-1">
          <span className="label-text">First Name </span>
        </label>
        <Input
          type="text"
          placeholder="Input first name..."
          className="col-span-2 my-1 input input-sm input-bordered w-full max-w-xs"
          defaultValue={profile.firstName}
          onChange={(e) => formEditProfile.firstName=e.target.value}
        />
        <label className="label col-span-1">
          <span className="label-text">Last Name</span>
        </label>
        <Input
          type="text"
          placeholder="Input last name..."
          className="col-span-2 my-1 input input-sm input-bordered w-full max-w-xs"
          defaultValue={profile.lastName}
          onChange={(e) => formEditProfile.lastName=e.target.value}
        />
        <label className="label col-span-1">
          <span className="label-text">Username</span>
        </label>
        <Input
          type="text"
          placeholder="Input username..."
          className="col-span-2 my-1 input input-sm input-bordered w-full max-w-xs"
          defaultValue={profile.userName}
          onChange={(e) => formEditProfile.userName=e.target.value}
        />
        <label className="label col-span-1">
          <span className="label-text">Email</span>
        </label>
        <Input
          type="text"
          placeholder="Input email..."
          className="col-span-2 my-1 input input-sm input-bordered w-full max-w-xs"
          defaultValue={profile.email}
          onChange={(e) => formEditProfile.email=e.target.value}
        />
        <label className="label col-span-1">
          <span className="label-text">Bio</span>
        </label>
        <Textarea
          placeholder="Input bio..."
          className="col-span-2 my-1 textarea textarea-accent"
          defaultValue={profile.bio}
          onChange={(e) => formEditProfile.bio=e.target.value}
        />
        <label className="label col-span-1">
          <span className="label-text">Profile Picture</span>
        </label>
        <input type="file" ref={filePickerRef} class="block w-full text-sm text-slate-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-violet-50 file:text-violet-700
        hover:file:bg-violet-100
        "
        onChange={(e)=>formEditProfile.profilePicture=changeProfilePicture(e)}
        />
      </div>
      <div className="flex">
        <SaveButton clickSave={()=>handleSave(formEditProfile)}/> 
        <CancelButton clickCancel={handleCancel}/>
      </div>
    </>
  }

  function changeProfilePicture(e) {
    const reader = new FileReader()
    if(e.target.files[0]){
      reader.readAsDataURL(e.target.files[0])
    }
    return reader.onload = (readerEvent) => {
      return readerEvent.target.result
    }
  }

  return (
    <>
      <div className="container flex px-4">
        <div className="avatar m-auto basis-1/4 place-content-center image-full">
          <div className="w-40 rounded-full">
            <img className="mt-0" src={profile.profilePicture} />
          </div>
        </div>
        <div className="px-4 grow">
          { editIsOn 
            ? <>
              {showEditProfile()}       
            </>
            : <>
              {printProfile()} 
            </>
          }
        </div>
      </div>
    </>
  );
}

ProfilePage.layout = "L1";

export default ProfilePage